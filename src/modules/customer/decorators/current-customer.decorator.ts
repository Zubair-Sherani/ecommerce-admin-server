import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentCustomer = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        return request.CurrentCustomer
    }
) 