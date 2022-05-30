import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';
export class updateTaskstatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
