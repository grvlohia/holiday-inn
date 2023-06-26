import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'

import { RegisterDto } from './dto/register.dto'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    try {
      const createdUser = await this.userService.create({
        ...registerDto,
        provider: 'email'
      })

      return createdUser
    } catch (e) {
      // TODO: add contraint for restrciting creation of duplicate user
      console.log(e)
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await compare(password, hashedPassword)

    if (!isPasswordMatching) {
      throw new HttpException(
        'The username/email and password combination is incorrect',
        HttpStatus.UNAUTHORIZED
      )
    }
  }

  async getUser(identifier: string, password: string) {
    try {
      const user = await this.userService.findByIdentifier(identifier)

      await this.verifyPassword(password, user.password)
      return user
    } catch (error) {
      throw new HttpException(
        'The username/email and password combination is incorrect',
        HttpStatus.UNAUTHORIZED
      )
    }
  }

  getAccessToken(id: string) {
    return this.jwtService.sign({ id })
  }
}
