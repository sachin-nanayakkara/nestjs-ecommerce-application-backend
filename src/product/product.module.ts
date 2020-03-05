import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductRepository} from './repository/product.repository';
import {ProductsController} from './controller/product.controller';
import {ProductService} from './service/product.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductRepository]),
    ],
    controllers: [ProductsController],
    providers: [ProductService],
})
export class ProductsModule {}
