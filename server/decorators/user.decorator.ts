import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const User = createParamDecorator((data: string, cts: ExecutionContext) => {
  const request = cts.switchToHttp().getRequest()
  const user = request.user

  return data ? user?.[data] : user
})
