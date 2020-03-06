import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    discount: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    productImage: string;

    @IsNotEmpty()
    lastUpdate: Date;
}
