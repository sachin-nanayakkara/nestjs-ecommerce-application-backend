import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTasksFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
}
