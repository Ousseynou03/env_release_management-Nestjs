import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planning } from 'src/typeorm/entities/Planning';
import { TasksController } from '../tasks/controllers/tasks/tasks.controller';
import { TasksService } from '../tasks/services/tasks/tasks.service';
import { Task } from '../typeorm/entities/Task';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Planning])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
