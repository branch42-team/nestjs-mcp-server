import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateApiKeyDto {
  @ApiProperty({
    description: 'Name/description for the API key',
    example: 'MCP Client Key',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'Optional expiration date for the API key',
    example: '2025-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiresAt?: Date;
}

export class ApiKeyResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the API key',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Name/description of the API key',
    example: 'MCP Client Key',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description:
      'The actual API key (only returned on creation, never shown again)',
    example:
      'epck_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  })
  @IsOptional()
  @IsString()
  key?: string;

  @ApiPropertyOptional({
    description: 'Last time this key was used',
    example: '2024-11-25T10:30:00Z',
  })
  @IsOptional()
  @IsDate()
  lastUsedAt?: Date;

  @ApiPropertyOptional({
    description: 'Expiration date of the key',
    example: '2025-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDate()
  expiresAt?: Date;

  @ApiProperty({
    description: 'Whether the key is active',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Creation date of the key',
    example: '2024-11-25T10:00:00Z',
  })
  @IsDate()
  createdAt: Date;
}

export class ApiKeyListItemDto {
  @ApiProperty({
    description: 'Unique identifier for the API key',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Name/description of the API key',
    example: 'MCP Client Key',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Last time this key was used',
    example: '2024-11-25T10:30:00Z',
  })
  @IsOptional()
  @IsDate()
  lastUsedAt?: Date;

  @ApiPropertyOptional({
    description: 'Expiration date of the key',
    example: '2025-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDate()
  expiresAt?: Date;

  @ApiProperty({
    description: 'Whether the key is active',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Creation date of the key',
    example: '2024-11-25T10:00:00Z',
  })
  @IsDate()
  createdAt: Date;
}
