import { z } from 'zod';
import { createValidateDto } from '../common/validation/validate.dto';

const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export class UpdateTaskDto extends createValidateDto(updateTaskSchema) {}
