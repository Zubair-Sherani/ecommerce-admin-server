import { Exclude, Expose } from "@nestjs/class-transformer";
import { IsEmail, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CustomerDto {
    @IsOptional()
    @Expose()
    id: number;

    @IsEmail()
    @Expose()
    email: string;

    @IsString()
    @MinLength(8)
    @Exclude()
    password: string;
}