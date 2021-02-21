import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsNonPrimitiveArray(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsNonPrimitiveArray',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            Array.isArray(value) &&
            value.reduce(
              (a, b) => a && typeof b === 'object' && !Array.isArray(b),
              true,
            )
          );
        },
      },
    });
  };
}

export function IsOnlyDate(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'property must be formatted as yyyy-mm-dd',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const regex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
          return typeof value === 'string' && regex.test(value);
        },
      },
    });
  };
}

export interface TypedTransformer<TEntity, TDatabase> {
  to: (entityValue: TEntity) => TDatabase;
  from: (databaseValue: TDatabase) => TEntity;
}

export const dateTransformer: TypedTransformer<Date, string> = {
  to: (value: Date) => {
    return value.toISOString().split('T')[0];
  },
  from: (value: string) => {
    return new Date(value);
  },
} as const;
