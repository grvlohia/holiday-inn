import Joi from 'joi'

import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe'

export class RegisterDto {
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  phoneNumber: string
}

const registerDtoJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required()
}).options({ abortEarly: false, allowUnknown: false })

export const RegisterDtoValidationPipe = new JoiValidationPipe(registerDtoJoiSchema)
