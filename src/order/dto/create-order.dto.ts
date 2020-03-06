import {IsNotEmpty} from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    subTotal: number;

    @IsNotEmpty()
    discount: number;

    @IsNotEmpty()
    delivery: number;

    @IsNotEmpty()
    dateCreated: Date;

    @IsNotEmpty()
    cartProduct: JSON;
}

