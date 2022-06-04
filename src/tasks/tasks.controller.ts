import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { updateTaskstatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksService.getAllTasks(filterDto);
  }

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDTO): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskWithFilter(filterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  @Post()
  createTask(
    @Body() createtaskdto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createtaskdto, user);
  }

  // @Post()
  // createTask(@Body() createtaskdto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createtaskdto);
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  @Delete('/:id')
  getTaskByIdDelete(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  // @Delete('/:id')
  // getTaskByIdDelete(@Param('id') id: string): void {
  //   return this.tasksService.deleteTask(id);
  // }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') updateTaskstatusDto: updateTaskstatusDto,
  ): Promise<Task> {
    const { status } = updateTaskstatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status') updateTaskstatusDto: updateTaskstatusDto,
  // ): Task {
  //   const { status } = updateTaskstatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
