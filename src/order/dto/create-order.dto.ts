import {IsNotEmpty} from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    subTotal: bigint;

    @IsNotEmpty()
    discount: bigint;

    @IsNotEmpty()
    delivery: bigint;

    @IsNotEmpty()
    dateCreated: Date;

    @IsNotEmpty()
    cartProduct: JSON;
}

