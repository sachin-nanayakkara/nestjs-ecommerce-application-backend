import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../auth/auth.module';
import {OrderRepository} from './repository/order.repository';
import {OrdersService} from './service/order.service';
import {OrderController} from './controller/order.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderRepository]),
        AuthModule,
    ],
    controllers: [OrderController],
    providers: [OrdersService],
})
export class OrdersModule {}
