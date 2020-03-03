import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    description: string;
}
