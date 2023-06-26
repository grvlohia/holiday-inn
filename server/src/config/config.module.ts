import { Module } from '@nestjs/common'
import { ConfigModule as NestjsConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

import databaseConfig from './database.config'

const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  MONGODB_URL: Joi.string().required()
})

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      load: [databaseConfig],
      validationSchema: validationSchema
    })
  ]
})
export class ConfigModule {}
