import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitEmail'
})
export class SplitEmailPipe implements PipeTransform {
  transform(value: string): string {
    const maxLength = 22;
    const atIndex = value.indexOf('@');

    if (atIndex !== -1 && value.length > maxLength) {
      const firstPart = value.substring(0, atIndex);
      const secondPart = value.substring(atIndex);
      return `${firstPart}<br>${secondPart}`;
    }

    return value;
  }
}
