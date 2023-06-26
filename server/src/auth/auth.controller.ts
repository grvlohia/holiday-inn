import { Body, Controller, Post, UseGuards } from '@nestjs/common'

import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LocalAuthGuard } from './guards/local.guard'
import { User } from 'decorators/user.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto)
    const accessToken = this.authService.getAccessToken(user.id)

    return {
      user,
      accessToken
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: any) {
    const accessToken = this.authService.getAccessToken(user.id)

    return {
      user,
      accessToken
    }
  }
}
