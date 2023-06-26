import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategy/local.strategy'
import { AUTH_CONFIG_KEYS } from 'src/config/auth.config'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(AUTH_CONFIG_KEYS.JWT_SECRET),
        signOptions: {
          expiresIn: `${configService.get<number>(AUTH_CONFIG_KEYS.JWT_EXPIRY_TIME)}`
        }
      })
    })
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
