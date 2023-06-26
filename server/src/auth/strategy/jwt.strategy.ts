import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AUTH_CONFIG_KEYS } from 'src/config/auth.config'
import { UserService } from 'src/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(AUTH_CONFIG_KEYS.JWT_SECRET)
    })

    console.log(configService.get<string>(AUTH_CONFIG_KEYS.JWT_SECRET))
  }

  async validate(payload: any) {
    const { sub: id } = payload
    return await this.userService.findById(id)
  }
}
