import { createValidateDto } from '../common/validation/validate.dto';
import { z } from 'zod';

const createTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export class CreateTaskDto extends createValidateDto(createTaskSchema) {}
