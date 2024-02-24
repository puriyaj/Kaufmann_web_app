import { plainToClass } from 'class-transformer';
import { validate as validateClass } from 'class-validator';
import 'reflect-metadata';
import { GeneralError } from './genral-error';

export async function validate<T>(data: unknown, ClassModel: new (..._args: any) => T): Promise<boolean> {
  if (!data) throw new GeneralError('validation data is required', { ishandledError: true });
  if (typeof data != 'object') throw new GeneralError('validation data is not object', { ishandledError: true });

  const instance: any = plainToClass(ClassModel, data);

  const validationResult = await validateClass(instance);

  if (validationResult && validationResult.length > 0) {
    let errors = validationResult.map((it) => Object.values(it.constraints ?? {}).map((str) => ({ message: str }))).flat();
    console.log('errors', errors);
    if (errors.length > 0) throw new GeneralError('اطلاعات وارد شده نامعتبر', { ishandledError: true, statusCode: 400 });
  }

  return true;
}
