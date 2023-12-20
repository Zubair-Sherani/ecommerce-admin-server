import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Session, UseInterceptors, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CustomerDto } from './customer.dto';
import { AuthService } from './auth.service';
import { CurrentCustomer } from 'src/modules/customer/decorators/current-customer.decorator';
import { CurrentCustomerInterceptor } from './interceptors/current-customer.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('customer')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class CustomerController {
  constructor(private readonly customerService: CustomerService, private readonly authService: AuthService) { }


  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentCustomer() customer: CustomerDto) {
    return customer
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.userId = null
    return
  }

  @Post('signin')
  async signIn(@Body() createCustomerDto: CustomerDto, @Session() session: any) {
    const user = await this.authService.signin(createCustomerDto);
    session.userId = user.id;
    return user
  }

  @Post('signup')
  async create(@Body() createCustomerDto: CustomerDto, @Session() session: any) {
    const user = await this.authService.signup(createCustomerDto);
    session.userId = user.id
    return user
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Serialize(CustomerDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: CustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
