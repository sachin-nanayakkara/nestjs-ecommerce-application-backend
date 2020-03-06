import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {OrderRepository} from '../repository/order.repository';
import {User} from '../../auth/entity/user.entity';
import {Order} from '../entity/order.entity';
import {CreateOrderDto} from '../dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,
    ) {
    }

    async getOrderById(
        id: number,
        user: User,
    ): Promise<Order> {
        const found = await this.orderRepository.findOne({where: {id, userId: user.id}});

        if (!found) {
            throw new NotFoundException(`Order with ID "${id}" not found`);
        }

        return found;
    }

    async createOrder(
        createOrderDto: CreateOrderDto,
        user: User,
    ): Promise<Order> {
        return this.orderRepository.createOrder(createOrderDto, user);
    }

    async deleteOrder(
        id: number,
        user: User,
    ): Promise<void> {
        const result = await this.orderRepository.delete({id, userId: user.id});

        if (result.affected === 0) {
            throw new NotFoundException(`Order with ID "${id}" not found`);
        }
    }

    async updateOrderStatus(
        id: number,
        createOrderDto: CreateOrderDto,
        user: User,
    ): Promise<Order> {
        const {subTotal, discount, delivery, dateCreated, cartProduct} = createOrderDto;

        const order = await this.getOrderById(id, user);
        order.subTotal = subTotal;
        order.discount = discount;
        order.delivery = delivery;
        order.dateCreated = dateCreated;
        order.cartProduct = cartProduct;
        await order.save();
        return order;
    }
}
