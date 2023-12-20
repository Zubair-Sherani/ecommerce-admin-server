import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Repository } from 'typeorm';
import { CustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>) { }

  create(createCustomerDto: CustomerDto) {
    const customer: Customer = new Customer({ ...createCustomerDto })
    return this.customerRepository.save(customer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: number) {
    if (!id)
      return null
    return this.customerRepository.findOne({
      where: {
        id
      }
    });
  }

  update(id: number, updateCustomerDto: CustomerDto) {
    const customer: Customer = new Customer({ ...updateCustomerDto })
    customer.id = id;
    return this.customerRepository.save(customer);
  }

  remove(id: number) {
    return this.customerRepository.delete(id)
  }

  findByEmail(email: string) {
    return this.customerRepository.findOne({
      where: {
        email
      }
    });
  }
}
