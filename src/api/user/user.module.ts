import { ApiKeyEntity } from '@/auth/entities/api-key.entity';
import { UserEntity } from '@/auth/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyController } from './api-key.controller';
import { ApiKeyService } from './api-key.service';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ApiKeyEntity])],
  controllers: [UserController, ApiKeyController],
  providers: [UserService, UserResolver, ApiKeyService],
  exports: [UserService, ApiKeyService],
})
export class UserModule {}
