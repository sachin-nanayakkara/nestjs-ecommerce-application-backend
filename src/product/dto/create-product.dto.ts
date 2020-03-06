import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: bigint;

    @IsNotEmpty()
    discount: bigint;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    productImage: string;

    @IsNotEmpty()
    lastUpdate: Date;
}
