import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { hash } from 'bcrypt'
import { HydratedDocument } from 'mongoose'

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
export class User {
  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  username: string

  @Prop()
  email: string

  @Prop()
  phoneNumber: string

  @Prop()
  password: string

  @Prop()
  provider: 'email' | 'google'
}

type UserDocument = HydratedDocument<User>
const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) return next()
  this.password = await hash(this.password, 10)
  next()
})

export { UserSchema, UserDocument }
