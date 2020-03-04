import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from './config/typeorm.config';
import {AuthModule} from './auth/auth.module';
import {OrdersModule} from './order/order.module';
import {ProductsModule} from './product/product.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        OrdersModule,
        ProductsModule,
        AuthModule,
    ],
})
export class AppModule {
}
