import {IsNotEmpty, IsNumber, IsOptional, Max, Min} from 'class-validator';

export class GetProductsPaginationDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    pageSize: number = 10;
}
