import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { ValidateDtoContent } from './validate.dto';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: ValidateDtoContent<ZodSchema>, metadata) {
    const { metatype } = metadata as { metatype: ValidateDtoContent<ZodSchema> };

    if (!metatype?.schema) {
      return value;
    }

    const { schema } = (metadata as { metatype: ValidateDtoContent<ZodSchema> }).metatype;

    const result = schema.safeParse(value);

    if (!result.success) {
      const zodError = result as unknown as ZodError;

      throw new BadRequestException(zodError);
    }

    return value;
  }
}
