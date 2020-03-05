import {IsNotEmpty} from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    amount: string;

    @IsNotEmpty()
    dateCreated: string;
}

