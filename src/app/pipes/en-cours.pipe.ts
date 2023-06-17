import { Pipe, PipeTransform } from '@angular/core';
import {Task} from '../models/task';
import {TaskStatus} from '../models/task-status';

@Pipe({
  name: 'execution'
})
export class EnCoursPipe implements PipeTransform {

  transform(items: Task[]): Task[] {
    if (!items) {
      return [];
    }
    return items.filter((it: Task) => {
      return it.status === TaskStatus.pending
    });
  }

}
