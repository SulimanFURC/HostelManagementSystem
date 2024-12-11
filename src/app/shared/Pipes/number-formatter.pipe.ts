import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter'
})
export class NumberFormatterPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined) return '';

    // Convert the number to absolute for formatting
    const absValue = Math.abs(value);

    // Format based on size
    if (absValue >= 1e9) {
      return (value / 1e9).toFixed(1).replace(/\.0$/, '') + 'B'; // Billions
    } else if (absValue >= 1e6) {
      return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'; // Millions
    } else if (absValue >= 1e3) {
      return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'; // Thousands
    }

    // Return the original value for numbers less than 1,000
    return value.toString().replace(/\.0+$/, '');
  }

}
