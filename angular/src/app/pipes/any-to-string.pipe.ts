import { Pipe, PipeTransform } from "@angular/core";

/**
 * Use `{{ anyValue | anytostr }}` to transform
 * a vaule of `any` type into strings
 */
@Pipe({name: 'anytostr'})
export class AnyToStringPipe implements PipeTransform{

    constructor(
    ){}
    
    /**
     * Use `{{ anyValue | anytostr }}` to transform
     * a vaule of `any` type into strings
     */
    transform(value: any): string{
        if (typeof value == 'string')
            return value;
        else if (typeof value == 'number')
            return value.toString();
        else
            return value.toString();
    }
}