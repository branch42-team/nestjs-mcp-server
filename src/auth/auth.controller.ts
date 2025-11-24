import { ErrorDto } from '@/common/dto/error.dto';
import { Serialize } from '@/utils/interceptors/serialize';
import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ChangeRoleDto, ChangeRoleResponseDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Put('change-role-to-admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Change user role to admin',
    description:
      "Changes a user's role to admin by their email address. Requires authentication.",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Role successfully updated to admin',
    type: ChangeRoleResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - User not logged in',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: ErrorDto,
  })
  @Serialize(ChangeRoleResponseDto)
  async changeRoleToAdmin(
    @Body() changeRoleDto: ChangeRoleDto,
  ): Promise<ChangeRoleResponseDto> {
    return this.authService.changeRoleToAdmin(changeRoleDto.email);
  }
}
