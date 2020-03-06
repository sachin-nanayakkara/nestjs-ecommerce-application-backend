import {Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {OrdersService} from '../service/order.service';
import {User} from '../../auth/entity/user.entity';
import {GetUser} from '../../auth/decorator/get-user.decorator';
import {Order} from '../entity/order.entity';
import {CreateOrderDto} from '../dto/create-order.dto';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrderController {
    private logger = new Logger('TasksController');

    constructor(private ordersService: OrdersService) {}

    @Get('/:id')
    getOrderById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Order> {
        return this.ordersService.getOrderById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @GetUser() user: User,
    ): Promise<Order> {
        this.logger.verbose(`User "${user.username}" creating a new order. Data: ${JSON.stringify(createOrderDto)}`);
        return this.ordersService.createOrder(createOrderDto, user);
    }

    @Delete('/:id')
    deleteOrder(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.ordersService.deleteOrder(id, user);
    }

    @Patch('/:id')
    updateOrderStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() createOrderDto: CreateOrderDto,
        @GetUser() user: User,
    ): Promise<Order> {
        return this.ordersService.updateOrderStatus(id, createOrderDto, user);
    }
}
