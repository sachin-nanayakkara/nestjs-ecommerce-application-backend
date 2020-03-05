import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetRatingsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
}
