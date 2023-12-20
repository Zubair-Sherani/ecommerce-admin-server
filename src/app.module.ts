import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.STACKHERO_POSTGRESQL_HOST,
    port: parseInt(<string>process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.STACKHERO_POSTGRESQL_ADMIN_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    autoLoadEntities: true,
    // logging: 'all',
    synchronize: true,
    poolSize: 10,
    ssl: {
      rejectUnauthorized: false
    }
  }),
  CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
