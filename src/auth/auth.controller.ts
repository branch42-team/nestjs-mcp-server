import { ApiPublic } from '@/decorators/http.decorators';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ChangePasswordDto,
  MessageResponseDto,
  RequestPasswordResetDto,
  ResetPasswordDto,
  SendVerificationEmailDto,
  SignInEmailDto,
  SignInResponseDto,
  SignUpEmailDto,
  SignUpResponseDto,
} from './dto/auth.dto';

/**
 * Authentication Controller
 *
 * This controller provides Swagger documentation for Better Auth endpoints.
 * The actual authentication logic is handled by Better Auth at /api/auth/* endpoints.
 *
 * Better Auth API Reference: /api/auth/reference
 */
@ApiTags('authentication')
@Controller({
  path: 'auth-docs',
  version: '1',
})
export class AuthController {
  /**
   * Sign Up with Email and Password
   *
   * Actual endpoint: POST /api/auth/sign-up/email
   */
  @ApiPublic({
    summary: 'Sign up with email and password',
    type: SignUpResponseDto,
    statusCode: HttpStatus.CREATED,
    description: `
      **Actual Endpoint:** \`POST /api/auth/sign-up/email\`
      
      Creates a new user account with email and password.
      
      **Note:** Email verification is required before the user can log in.
    `,
  })
  @Post('sign-up/email')
  @HttpCode(HttpStatus.CREATED)
  async signUpEmail(@Body() dto: SignUpEmailDto): Promise<SignUpResponseDto> {
    throw new Error(
      'This is a documentation endpoint. Use POST /api/auth/sign-up/email instead.',
    );
  }

  /**
   * Sign In with Email and Password
   *
   * Actual endpoint: POST /api/auth/sign-in/email
   */
  @ApiPublic({
    summary: 'Sign in with email and password',
    type: SignInResponseDto,
    description: `
      **Actual Endpoint:** \`POST /api/auth/sign-in/email\`
      
      Authenticates a user with email and password.
      
      **Note:** Returns 403 if email is not verified (when \`requireEmailVerification\` is enabled).
    `,
  })
  @Post('sign-in/email')
  @HttpCode(HttpStatus.OK)
  async signInEmail(@Body() dto: SignInEmailDto): Promise<SignInResponseDto> {
    throw new Error(
      'This is a documentation endpoint. Use POST /api/auth/sign-in/email instead.',
    );
  }

  /**
   * Sign Out
   *
   * Actual endpoint: POST /api/auth/sign-out
   */
  @ApiPublic({
    summary: 'Sign out current user',
    type: MessageResponseDto,
    description: `
      **Actual Endpoint:** \`POST /api/auth/sign-out\`
      
      Signs out the current user by invalidating their session.
      
      **Note:** Requires valid session cookie.
    `,
  })
  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async signOut(): Promise<MessageResponseDto> {
    throw new Error(
      'This is a documentation endpoint. Use POST /api/auth/sign-out instead.',
    );
  }

  /**
   * Request Password Reset
   *
   * Actual endpoint: POST /api/auth/forget-password
   */
  @ApiPublic({
    summary: 'Request password reset',
    type: MessageResponseDto,
    description: `
      **Actual Endpoint:** \`POST /api/auth/forget-password\`
      
      Sends a password reset email to the user if the email exists in the system.
      
      **Note:** For security reasons, always returns success even if the email doesn't exist.
    `,
  })
  @Post('forget-password')
  @HttpCode(HttpStatus.OK)
  async requestPasswordReset(
    @Body() dto: RequestPasswordResetDto,
  ): Promise<MessageResponseDto> {
    throw new Error(
      'This is a documentation endpoint. Use POST /api/auth/forget-password instead.',
    );
  }

  /**
   * Reset Password
   *
   * Actual endpoint: POST /api/auth/reset-password
   */
  @ApiPublic({
    summary: 'Reset password with token',
    type: MessageResponseDto,
    description: `
      **Actual Endpoint:** \`POST /api/auth/reset-password\`
      
      Resets the user's password using a valid reset token from the email.
      
      **Note:** Token expires after a configured duration (default: 1 hour).
    `,
  })
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() dto: ResetPasswordDto,
  ): Promise<MessageResponseDto> {
    throw new Error(
      'This is a documentation endpoint. Use POST /api/auth/reset-password instead.',
    );
  }

  /**
   * Change Password
   *
   * Actual endpoint: POST /api/auth/change-password
   */
  @ApiPublic({
    summary: 'Change password for authenticated user',
    type: MessageResponseDto,
    description: `
      **Actual Endpoint:** \`POST /api/auth/change-password\`
      
      Changes the password for the currently authenticated user.
      
      **Note:** Requires valid session cookie and current password verification.
    `,
  })
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Body() dto: ChangePasswordDto,
  ): Promise<MessageResponseDto> {
    throw new Error(
      'This is a documentation endpoint. Use POST /api/auth/change-password instead.',
    );
  }

  /**
   * Send Verification Email
   *
   * Actual endpoint: POST /api/auth/send-verification-email
   */
  @ApiPublic({
    summary: 'Send email verification link',
    type: MessageResponseDto,
    description: `
      **Actual Endpoint:** \`POST /api/auth/send-verification-email\`
      
      Sends a verification email to the specified email address.
      
      **Note:** Required when \`requireEmailVerification\` is enabled.
    `,
  })
  @Post('send-verification-email')
  @HttpCode(HttpStatus.OK)
  async sendVerificationEmail(
    @Body() dto: SendVerificationEmailDto,
  ): Promise<MessageResponseDto> {
    throw new Error(
      'This is a documentation endpoint. Use POST /api/auth/send-verification-email instead.',
    );
  }
}
