import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
export class updateTaskstatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
