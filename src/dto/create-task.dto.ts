import { z } from 'zod';
import { createValidateDto } from '../common/validation/validate.dto';

const createTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export class CreateTaskDto extends createValidateDto(createTaskSchema) {}
