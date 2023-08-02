import { ValidationArguments, ValidationOptions, Validator, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator"
import { AppDataSource } from "../database/data-source";

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    public defaultMessage(): string {
        return `$property already in use`
    }

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        const [entity, field] = args.constraints;
        const repository = AppDataSource.getRepository(entity);
        const count = await repository.count({ where: { [field]: value } });
        return count <= 0;
    }
}

export function IsUnique(entity: any, field: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entity, field],
            validator: IsUniqueConstraint
        })
    }

}