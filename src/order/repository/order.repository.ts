import {EntityRepository, Repository} from 'typeorm';
import {Order} from '../entity/order.entity';
import {InternalServerErrorException, Logger} from '@nestjs/common';
import {User} from '../../auth/entity/user.entity';
import {GetOrdersFilterDto} from '../dto/get-order.dto';
import {CreateOrderDto} from '../dto/create-order.dto';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    private logger = new Logger('OrderRepository');

    async getOrders(
        filterDto: GetOrdersFilterDto,
        user: User,
    ): Promise<Order[]> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('order');

        query.where('order.userId = :userId', { userId: user.id });

        if (search) {
            query.andWhere('(order.amount LIKE :search OR order.dateCreated LIKE :search)', { search: `%${search}%` });
        }

        try {
            const orders = await query.getMany();
            return orders;
        } catch (error) {
            this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createOrder(
        createOrderDto: CreateOrderDto,
        user: User,
    ): Promise<Order> {
        const { amount, dateCreated } = createOrderDto;

        const order = new Order();
        order.amount = amount;
        order.dateCreated = dateCreated;
        order.user = user;

        try {
            await order.save();
        } catch (error) {
            this.logger.error(`Failed to create a task for user "${user.username}". Data: ${createOrderDto}`, error.stack);
            throw new InternalServerErrorException();
        }

        delete order.user;
        return order;
    }
}
