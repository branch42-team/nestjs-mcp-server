import { AuthGuard } from '@/auth/auth.guard';
import { AuthUser } from '@/decorators/auth/user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeyService } from './api-key.service';
import {
  ApiKeyListItemDto,
  ApiKeyResponseDto,
  CreateApiKeyDto,
} from './dto/api-key.dto';

@ApiTags('API Keys')
@ApiSecurity('session')
@Controller({ path: 'user/api-keys', version: '1' })
@UseGuards(AuthGuard)
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new API key',
    description:
      'Generate a new API key for MCP server access. The key is only shown once upon creation.',
  })
  @ApiResponse({
    status: 201,
    description: 'API key created successfully',
    type: ApiKeyResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - user not authenticated',
  })
  async createApiKey(
    @AuthUser('id') userId: string,
    @Body() dto: CreateApiKeyDto,
  ): Promise<ApiKeyResponseDto> {
    return this.apiKeyService.createApiKey(userId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all API keys',
    description:
      'Get a list of all API keys for the current user. The actual key values are never returned.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of API keys',
    type: [ApiKeyListItemDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - user not authenticated',
  })
  async listApiKeys(
    @AuthUser('id') userId: string,
  ): Promise<ApiKeyListItemDto[]> {
    return this.apiKeyService.listUserApiKeys(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get API key details',
    description: 'Get details of a specific API key (without the key value)',
  })
  @ApiResponse({
    status: 200,
    description: 'API key details',
    type: ApiKeyListItemDto,
  })
  @ApiResponse({
    status: 404,
    description: 'API key not found',
  })
  async getApiKey(
    @AuthUser('id') userId: string,
    @Param('id') keyId: string,
  ): Promise<ApiKeyListItemDto> {
    return this.apiKeyService.getApiKey(userId, keyId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Revoke an API key',
    description: 'Permanently revoke an API key. This action cannot be undone.',
  })
  @ApiResponse({
    status: 204,
    description: 'API key revoked successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'API key not found',
  })
  async revokeApiKey(
    @AuthUser('id') userId: string,
    @Param('id') keyId: string,
  ): Promise<void> {
    await this.apiKeyService.revokeApiKey(userId, keyId);
  }
}
