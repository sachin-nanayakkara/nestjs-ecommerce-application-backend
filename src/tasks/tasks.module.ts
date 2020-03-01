import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TaskRepository} from './repository/task.repository';
import {TasksController} from './controller/tasks.controller';
import {TasksService} from './service/tasks.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([TaskRepository]),
    ],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule {}
