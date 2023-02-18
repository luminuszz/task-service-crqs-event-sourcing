import { ZodSchema } from 'zod';

export type ValidateDtoContent<Schema extends ZodSchema> = {
  new (): Schema['_output'];
  schema: ZodSchema;
  create(data: Schema['_output']): Schema['_output'];
};

export type ValidateResponse<Schema extends ZodSchema> = Omit<ValidateDtoContent<Schema>, 'create' | 'schema'> & {
  new (): Schema['_output'];
};

export function createValidateDto<Schema extends ZodSchema>(schema: Schema) {
  class ValidationDto {
    public static schema = schema;

    public static create(data: ZodSchema) {
      const response = schema.safeParse(data);
      if (!response.success) {
        const { error } = response as any;
        throw new Error(error);
      }
      return response.data;
    }
  }

  return ValidationDto as unknown as ValidateResponse<Schema>;
}
