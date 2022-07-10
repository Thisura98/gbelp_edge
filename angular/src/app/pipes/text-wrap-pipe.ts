import { Pipe, PipeTransform } from "@angular/core";

/**
 * Use `{{ someString | textwrap:10 }}` to wrap
 * a string to a fixed length
 */
@Pipe({
  name: 'textwrap'
})
export class TextWrapPipe implements PipeTransform{

  readonly ellipsis: string = '...';

  transform(value: string, maxChars: number): string {
    if (value.length > maxChars){
      const startChars = Math.ceil((maxChars - this.ellipsis.length) / 2);
      const endChars = Math.floor((maxChars - this.ellipsis.length) / 2);

      if (startChars > 0 && endChars > 0){
        let end = value.length;
        const s = value.substring(0, startChars);
        const e = value.substring(end - endChars, end);
        console.log(value, value.length, startChars, endChars, s, e);
        return s + this.ellipsis + e;
      }
    }
    return value;
  }

}