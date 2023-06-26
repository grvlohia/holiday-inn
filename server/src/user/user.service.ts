import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './schemas/user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto)
    return await createdUser.save()
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec()
    if (user) return user

    throw new HttpException('User with given id does not exist.', HttpStatus.NOT_FOUND)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec()
    if (user) return user

    throw new HttpException('User with given email does not exist.', HttpStatus.NOT_FOUND)
  }

  async findByIdentifier(identifier: string): Promise<User> {
    const user = await this.userModel.findOne({
      $or: [{ email: identifier }, { userName: identifier }]
    })

    if (user) return user

    throw new HttpException('User with given identifier does not exist.', HttpStatus.NOT_FOUND)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec()
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec()
  }
}
