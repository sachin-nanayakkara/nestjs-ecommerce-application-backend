import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetOrdersFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
}
