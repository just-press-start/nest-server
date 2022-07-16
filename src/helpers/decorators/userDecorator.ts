import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserCookie = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.['jwt'] : request.cookies;
  },
);
