import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidNumber } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  createTask(createtaskdto: CreateTaskDto): Task {
    const { title, description } = createtaskdto;
    const task: Task = {
      id: uuidNumber(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
