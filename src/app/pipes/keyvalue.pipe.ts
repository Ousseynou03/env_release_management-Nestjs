import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'match_value'
})
export class KeyvaluePipe implements PipeTransform {

  transform(input): any {
    const keys = [];
    for (const key in input) {
      if (['id', 'class_id', 'date_creation', 'description', 'planning_name', 'createdAt'].includes(key) === false) {
        keys.push(input[key]);
      }
    }
    return keys;
  }

}
