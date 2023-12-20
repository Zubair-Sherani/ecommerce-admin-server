import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column({ type: "varchar" })
    password: string

    constructor(patient: Partial<Customer>) {
        Object.assign(this, patient);
    }
}
