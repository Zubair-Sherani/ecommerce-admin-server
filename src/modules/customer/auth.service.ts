import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { CustomerDto } from "./customer.dto";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private customerService: CustomerService) { }

    async signup(customerDto: CustomerDto) {
        const customer = await this.customerService.findByEmail(customerDto.email)
        if (customer) {
            throw new BadRequestException('Email already in use.')
        }

        const salt = randomBytes(8).toString('hex')

        const hash = (await scrypt(customerDto.password, salt, 32)) as Buffer

        customerDto.password = salt + '.' + hash.toString('hex')

        const newCustomer = await this.customerService.create(customerDto);

        return newCustomer
    }

    async signin(customerDto: CustomerDto) {
        const user = await this.customerService.findByEmail(customerDto.email)

        if (!user) {
            throw new NotFoundException('User not found.')
        }

        const [salt, storedHash] = user.password.split('.')

        const hash = (await scrypt(customerDto.password, salt, 32)) as Buffer

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Incorrect email or password.')
        }
        return user
    }
}