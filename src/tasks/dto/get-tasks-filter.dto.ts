import {TaskStatus} from '../enum/task-status.enum';
import {IsIn, IsNotEmpty, IsOptional} from 'class-validator';

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
