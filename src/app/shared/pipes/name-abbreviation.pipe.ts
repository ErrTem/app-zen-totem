import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameAbbreviationPipe'
})
export class NameAbbreviationPipe implements PipeTransform {
  transform(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }
}
