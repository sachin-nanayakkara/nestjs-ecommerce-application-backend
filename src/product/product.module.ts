import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductRepository} from './repository/product.repository';
import {ProductsController} from './controller/product.controller';
import {ProductService} from './service/product.service';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductRepository]),
        AuthModule,
    ],
    controllers: [ProductsController],
    providers: [ProductService],
})
export class ProductsModule {}
