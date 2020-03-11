import {EntityRepository, Repository} from 'typeorm';
import {Order} from '../entity/order.entity';
import {InternalServerErrorException, Logger} from '@nestjs/common';
import {User} from '../../auth/entity/user.entity';
import {CreateOrderDto} from '../dto/create-order.dto';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    private logger = new Logger('OrderRepository');

    async createOrder(
        createOrderDto: CreateOrderDto,
        user: User,
    ): Promise<Order> {
        const {subTotal, discount, delivery, dateCreated, cartProduct} = createOrderDto;

        const order = new Order();
        order.subTotal = subTotal;
        order.discount = discount;
        order.delivery = delivery;
        order.dateCreated = dateCreated;
        order.cartProduct = cartProduct;
        order.user = user;

        try {
            await order.save();
        } catch (error) {
            this.logger.error(`Failed to create a task for user "${user.username}". Data: ${createOrderDto}`, error.stack);
            throw new InternalServerErrorException();
        }

     //   delete order.user;
        return order;
    }
}
