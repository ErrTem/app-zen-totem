import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTotalPrice'
})
export class LimitTotalPricePipe implements PipeTransform {
  transform(value: number, limit: number = 999): number {
    return Math.min(value, limit);
  }
}
