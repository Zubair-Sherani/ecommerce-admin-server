import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { CustomerService } from "../customer.service";
import { Observable } from "rxjs";

@Injectable()
export class CurrentCustomerInterceptor implements NestInterceptor {
    constructor(private customerService: CustomerService) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest()
        const { userId } = request.session || {}

        if (userId) {
            const customer = await this.customerService.findOne(userId)
            request.CurrentCustomer = customer
        }
        return next.handle()
    }
}