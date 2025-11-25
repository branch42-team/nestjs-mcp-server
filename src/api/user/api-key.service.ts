import { ApiKeyEntity } from '@/auth/entities/api-key.entity';
import { UserEntity } from '@/auth/entities/user.entity';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import {
  ApiKeyListItemDto,
  ApiKeyResponseDto,
  CreateApiKeyDto,
} from './dto/api-key.dto';

@Injectable()
export class ApiKeyService {
  // API key prefix to identify keys
  private readonly KEY_PREFIX = 'epck_'; // epicode key
  private readonly logger = new Logger(ApiKeyService.name);

  constructor(
    @InjectRepository(ApiKeyEntity)
    private readonly apiKeyRepository: Repository<ApiKeyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Generate a cryptographically secure API key
   * Format: epck_<64 hex characters>
   */
  private generateApiKey(): string {
    const randomBytes = crypto.randomBytes(32);
    const apiKey = this.KEY_PREFIX + randomBytes.toString('hex');
    this.logger.debug(
      `Generated new API key: ${apiKey.slice(0, 12)}... (truncated)`,
    );
    return apiKey;
  }

  /**
   * Hash an API key using SHA-256
   */
  private hashApiKey(key: string): string {
    const hash = crypto.createHash('sha256').update(key).digest('hex');
    this.logger.debug(`Hashed API key (truncated): ${hash.slice(0, 12)}...`);
    return hash;
  }

  /**
   * Create a new API key for a user
   */
  async createApiKey(
    userId: string,
    dto: CreateApiKeyDto,
  ): Promise<ApiKeyResponseDto> {
    this.logger.log(`Creating new API key for userId=${userId}`);

    // Generate the key
    const apiKey = this.generateApiKey();
    const keyHash = this.hashApiKey(apiKey);

    // Check if expiration date is in the future
    if (dto.expiresAt && dto.expiresAt <= new Date()) {
      this.logger.warn(
        `Attempted to create API key for userId=${userId} with past expiration date: ${dto.expiresAt}`,
      );
      throw new Error('Expiration date must be in the future');
    }

    // Create the entity
    const apiKeyEntity = this.apiKeyRepository.create({
      userId,
      name: dto.name,
      keyHash,
      expiresAt: dto.expiresAt,
      isActive: true,
    });

    // Save to database
    const savedKey = await this.apiKeyRepository.save(apiKeyEntity);

    this.logger.log(
      `API key created for userId=${userId}, keyId=${savedKey.id}`,
    );

    // Return the response with the actual key (only time it's shown)
    return {
      id: savedKey.id,
      name: savedKey.name,
      key: apiKey, // Only returned on creation
      lastUsedAt: savedKey.lastUsedAt,
      expiresAt: savedKey.expiresAt,
      isActive: savedKey.isActive,
      createdAt: savedKey.createdAt,
    };
  }

  /**
   * List all API keys for a user (without the actual key values)
   */
  async listUserApiKeys(userId: string): Promise<ApiKeyListItemDto[]> {
    this.logger.debug(`Listing API keys for userId=${userId}`);
    const keys = await this.apiKeyRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    this.logger.log(`Found ${keys.length} API keys for userId=${userId}`);

    return keys.map((key) => ({
      id: key.id,
      name: key.name,
      lastUsedAt: key.lastUsedAt,
      expiresAt: key.expiresAt,
      isActive: key.isActive,
      createdAt: key.createdAt,
    }));
  }

  /**
   * Revoke (soft delete) an API key
   */
  async revokeApiKey(userId: string, keyId: string): Promise<void> {
    this.logger.log(`Revoking API key keyId=${keyId} for userId=${userId}`);

    const apiKey = await this.apiKeyRepository.findOne({
      where: { id: keyId, userId },
    });

    if (!apiKey) {
      this.logger.warn(
        `Attempted to revoke non-existent API key keyId=${keyId} for userId=${userId}`,
      );
      throw new NotFoundException('API key not found');
    }

    // Soft delete the key
    await this.apiKeyRepository.softRemove(apiKey);
    this.logger.log(
      `Revoked (soft deleted) API key keyId=${keyId} for userId=${userId}`,
    );
  }

  /**
   * Validate an API key and return the associated user
   * Returns null if the key is invalid, expired, or inactive
   */
  async validateApiKey(key: string): Promise<UserEntity | null> {
    this.logger.debug(
      `Validating API key: ${key ? key.slice(0, 12) + '...' : '[empty]'}`,
    );

    // Check if key has correct prefix
    if (!key.startsWith(this.KEY_PREFIX)) {
      this.logger.warn('API key prefix invalid');
      return null;
    }

    // Hash the provided key
    const keyHash = this.hashApiKey(key);

    // Find the API key
    const apiKey = await this.apiKeyRepository.findOne({
      where: { keyHash, isActive: true },
      relations: ['user'],
    });

    if (!apiKey) {
      this.logger.warn('API key hash not found or inactive');
      return null;
    }

    // Check if key is expired
    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
      this.logger.warn(`API key keyId=${apiKey.id} is expired`);
      return null;
    }

    // Update last used timestamp (fire and forget)
    this.updateLastUsed(apiKey.id).catch((err) => {
      this.logger.error('Failed to update lastUsedAt:', err);
    });

    this.logger.debug(
      `API key validated for userId=${apiKey.user?.id || 'unknown'}`,
    );
    return apiKey.user;
  }

  /**
   * Validate an API key and throw if invalid
   */
  async validateApiKeyOrThrow(key: string): Promise<UserEntity> {
    const user = await this.validateApiKey(key);
    if (!user) {
      this.logger.warn(
        'Validation failed for API key (not found, expired, or inactive)',
      );
      throw new UnauthorizedException('Invalid or expired API key');
    }
    return user;
  }

  /**
   * Update the lastUsedAt timestamp for an API key
   */
  private async updateLastUsed(keyId: string): Promise<void> {
    this.logger.debug(`Updating lastUsedAt for keyId=${keyId}`);
    await this.apiKeyRepository.update(keyId, {
      lastUsedAt: new Date(),
    });
  }

  /**
   * Get API key by ID (for user's own keys only)
   */
  async getApiKey(userId: string, keyId: string): Promise<ApiKeyListItemDto> {
    this.logger.debug(`Fetching API key keyId=${keyId} for userId=${userId}`);
    const apiKey = await this.apiKeyRepository.findOne({
      where: { id: keyId, userId },
    });

    if (!apiKey) {
      this.logger.warn(
        `API key not found for getApiKey: keyId=${keyId} userId=${userId}`,
      );
      throw new NotFoundException('API key not found');
    }

    return {
      id: apiKey.id,
      name: apiKey.name,
      lastUsedAt: apiKey.lastUsedAt,
      expiresAt: apiKey.expiresAt,
      isActive: apiKey.isActive,
      createdAt: apiKey.createdAt,
    };
  }

  /**
   * Deactivate an API key (without deleting)
   */
  async deactivateApiKey(userId: string, keyId: string): Promise<void> {
    this.logger.log(`Deactivating API key keyId=${keyId} for userId=${userId}`);
    const apiKey = await this.apiKeyRepository.findOne({
      where: { id: keyId, userId },
    });

    if (!apiKey) {
      this.logger.warn(
        `API key not found for deactivation: keyId=${keyId} userId=${userId}`,
      );
      throw new NotFoundException('API key not found');
    }

    apiKey.isActive = false;
    await this.apiKeyRepository.save(apiKey);
    this.logger.log(`API key keyId=${keyId} deactivated for userId=${userId}`);
  }
}
