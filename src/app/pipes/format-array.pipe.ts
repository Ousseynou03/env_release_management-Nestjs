import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatArray'
})
export class FormatArrayPipe implements PipeTransform {

  transform(input, header: []): any {
    const keys = [];

    for (const key in header) {
      if (['id', 'class_id', 'date_creation', 'description'].includes(key) === false) {
        keys.push(input[header[key]]);
      }
    }
    return keys;
  }
}
