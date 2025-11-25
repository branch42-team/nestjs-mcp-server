import { ApiKeyService } from '@/api/user/api-key.service';
import { UserEntity } from '@/auth/entities/user.entity';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

/**
 * MCP Authentication Middleware
 *
 * Validates API keys provided in MCP requests and attaches user information.
 */
@Injectable()
export class McpAuthMiddleware {
  private readonly logger = new Logger(McpAuthMiddleware.name);

  constructor(private readonly apiKeyService: ApiKeyService) {}

  /**
   * Validate API key from request metadata and return user
   * Throws UnauthorizedException if invalid
   */
  async validateRequest(apiKey: string | undefined): Promise<UserEntity> {
    if (!apiKey) {
      this.logger.warn('MCP request without API key');
      throw new UnauthorizedException(
        'API key is required. Please provide a valid API key.',
      );
    }

    const user = await this.apiKeyService.validateApiKey(apiKey);

    if (!user) {
      this.logger.warn(
        `Invalid API key attempt: ${apiKey.substring(0, 10)}...`,
      );
      throw new UnauthorizedException(
        'Invalid or expired API key. Please check your credentials.',
      );
    }

    this.logger.debug(`Authenticated user: ${user.email} (${user.role})`);
    return user;
  }
}
