import { BaseModel } from '@/database/models/base.model';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

/**
 * API Key Entity
 *
 * Stores API keys for user authentication with MCP server.
 * Keys are hashed before storage for security.
 */
@Entity('api_key')
export class ApiKeyEntity extends BaseModel {
  @Index()
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Index()
  @Column({ type: 'varchar', length: 255, unique: true })
  keyHash: string;

  @Column({ type: 'timestamp', nullable: true })
  lastUsedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
