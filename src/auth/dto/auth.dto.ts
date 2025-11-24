import { Role } from '@/api/user/user.enum';
import {
  BooleanFieldOptional,
  EmailField,
  StringField,
  StringFieldOptional,
  URLFieldOptional,
} from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

// Sign Up DTOs
export class SignUpEmailDto {
  @StringField({ description: 'The name of the user', example: 'John Doe' })
  name: string;

  @EmailField({ description: 'The email address of the user' })
  email: string;

  @StringField({
    description:
      'The password of the user. It should be at least 8 characters long and max 128 by default',
    example: 'password1234',
    minLength: 8,
    maxLength: 128,
  })
  password: string;

  @URLFieldOptional({
    description: 'An optional profile image of the user',
  })
  image?: string;

  @URLFieldOptional({
    description: 'An optional URL to redirect to after the user signs up',
  })
  callbackURL?: string;
}

@Exclude()
export class AuthSessionDto {
  @ApiProperty({ description: 'Session token' })
  @Expose()
  token: string;

  @ApiProperty({ description: 'Session expiration date' })
  @Expose()
  expiresAt: Date;
}

@Exclude()
export class AuthUserDto {
  @StringField({ description: 'User ID' })
  @Expose()
  id: string;

  @EmailField({ description: 'User email address' })
  @Expose()
  email: string;

  @StringField({ description: 'User name' })
  @Expose()
  name: string;

  @StringFieldOptional({ description: 'User profile image' })
  @Expose()
  image?: string;

  @ApiProperty({ description: 'Whether email is verified', type: Boolean })
  @Expose()
  emailVerified: boolean;

  @ApiProperty({ description: 'User creation date' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: 'User last update date' })
  @Expose()
  updatedAt: Date;
}

@Exclude()
export class SignUpResponseDto {
  @ApiProperty({ type: AuthUserDto, description: 'User information' })
  @Expose()
  user: AuthUserDto;

  @ApiProperty({ type: AuthSessionDto, description: 'Session information' })
  @Expose()
  session: AuthSessionDto;
}

// Sign In DTOs
export class SignInEmailDto {
  @EmailField({ description: 'The email address of the user' })
  email: string;

  @StringField({
    description: 'The password of the user',
    example: 'password1234',
    minLength: 8,
    maxLength: 128,
  })
  password: string;

  @BooleanFieldOptional({
    description:
      'If false, the user will be signed out when the browser is closed',
    default: true,
  })
  rememberMe?: boolean;

  @URLFieldOptional({
    description: 'An optional URL to redirect to after the user signs in',
  })
  callbackURL?: string;
}

@Exclude()
export class SignInResponseDto {
  @ApiProperty({ type: AuthUserDto, description: 'User information' })
  @Expose()
  user: AuthUserDto;

  @ApiProperty({ type: AuthSessionDto, description: 'Session information' })
  @Expose()
  session: AuthSessionDto;
}

// Password Reset DTOs
export class RequestPasswordResetDto {
  @EmailField({
    description:
      'The email address of the user to send a password reset email to',
  })
  email: string;

  @URLFieldOptional({
    description:
      'The URL to redirect the user to reset their password. If the token is invalid or expired, it will be redirected with a query parameter ?error=INVALID_TOKEN. If the token is valid, it will be redirected with a query parameter ?token=VALID_TOKEN',
  })
  redirectTo?: string;
}

export class ResetPasswordDto {
  @StringField({
    description: 'The new password to set',
    example: 'newpassword1234',
    minLength: 8,
    maxLength: 128,
  })
  newPassword: string;

  @StringField({
    description: 'The token to reset the password',
  })
  token: string;
}

export class ChangePasswordDto {
  @StringField({
    description: 'The new password to set',
    example: 'newpassword1234',
    minLength: 8,
    maxLength: 128,
  })
  newPassword: string;

  @StringField({
    description: 'The current user password',
    example: 'oldpassword1234',
  })
  currentPassword: string;

  @BooleanFieldOptional({
    description:
      'When set to true, all other active sessions for this user will be invalidated',
    default: true,
  })
  revokeOtherSessions?: boolean;
}

// Email Verification DTOs
export class SendVerificationEmailDto {
  @EmailField({
    description: 'The email address to send verification email to',
  })
  email: string;

  @URLFieldOptional({
    description: 'The redirect URL after verification',
  })
  callbackURL?: string;
}

@Exclude()
export class MessageResponseDto {
  @ApiProperty({ description: 'Success message' })
  @Expose()
  message: string;

  @ApiProperty({ description: 'Success status', type: Boolean })
  @Expose()
  success: boolean;
}

// Change Role DTOs
export class ChangeRoleDto {
  @EmailField({
    description: 'The email address of the user to change role to admin',
  })
  email: string;
}

@Exclude()
export class ChangeRoleResponseDto {
  @ApiProperty({ description: 'Success message' })
  @Expose()
  message: string;

  @ApiProperty({ description: 'User ID of the updated user' })
  @Expose()
  userId: string;

  @ApiProperty({ description: 'New role assigned to the user' })
  @Expose()
  role: Role;
}
