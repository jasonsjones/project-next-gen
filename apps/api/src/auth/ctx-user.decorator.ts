import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CtxUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    return data ? user?.[data] : user;
});
