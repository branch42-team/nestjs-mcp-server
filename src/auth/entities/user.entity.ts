import { Role } from '@/api/user/user.enum';
import { BaseModel } from '@/database/models/base.model';
import { Column, Entity, Index } from 'typeorm';

// https://www.better-auth.com/docs/concepts/database#core-schema
@Entity('user')
export class UserEntity extends BaseModel {
  @Index({
    unique: true,
    where: '"deletedAt" IS NULL AND "username" IS NOT NULL',
  })
  @Column({ nullable: true })
  username?: string;

  @Index({ where: '"deletedAt" IS NULL' })
  @Column({ nullable: true })
  displayUsername: string;

  @Index({ unique: true, where: '"deletedAt" IS NULL' })
  @Column()
  email: string;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({
    type: 'varchar',
    default: Role.User,
  })
  role: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ type: 'boolean', default: false })
  twoFactorEnabled: boolean;

  @Column({ type: 'boolean', default: false })
  banned: boolean;

  @Column({ nullable: true })
  banReason?: string;

  @Column({ type: 'timestamp', nullable: true })
  banExpires?: Date;
}
