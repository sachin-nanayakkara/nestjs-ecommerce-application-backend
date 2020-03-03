import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetProductsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
}
