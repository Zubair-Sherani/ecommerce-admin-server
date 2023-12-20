import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentCustomerInterceptor } from './interceptors/current-customer.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService, AuthService, {
    provide: APP_INTERCEPTOR,
    useClass: CurrentCustomerInterceptor
  }],
})
export class CustomerModule { }
