import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { CustomerService } from "./customer.service";

it('Can create an instance of auth service', async () => {
    const fakeCustomerService = {
        create: (email: string, password: string) => Promise.resolve({ id: 1, email, password }),
        findAll: () => Promise.resolve([]),
        findOne: () => Promise.resolve(),
        update: () => Promise.resolve(),
        remove: () => Promise.resolve(),
        findByEmail: () => Promise.resolve(),
    };

    const module = await Test.createTestingModule({
        providers: [
            AuthService,
            {
                provide: CustomerService,
                useValue: fakeCustomerService
            }
        ]
    }).compile()

    const service = module.get(AuthService)

    expect(service).toBeDefined();
})