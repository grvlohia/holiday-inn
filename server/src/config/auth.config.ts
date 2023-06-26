import { registerAs } from '@nestjs/config'

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiryTime: parseInt(process.env.JWT_EXPIRY_TIME, 10)
}))

export const AUTH_CONFIG_KEYS = {
  JWT_SECRET: 'auth.jwtSecret',
  JWT_EXPIRY_TIME: 'auth.jwtExpiryTime'
}
