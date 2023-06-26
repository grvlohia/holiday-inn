import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common'

import { AuthService } from './auth.service'
import { RegisterDto, RegisterDtoValidationPipe } from './dto/register.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { User } from 'decorators/user.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(RegisterDtoValidationPipe)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto)
    const accessToken = this.authService.getAccessToken(user.id, user.userName)

    return {
      user,
      accessToken
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: any) {
    const accessToken = this.authService.getAccessToken(user.id, user.userName)

    return {
      user,
      accessToken
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: any) {
    return user
  }
}
