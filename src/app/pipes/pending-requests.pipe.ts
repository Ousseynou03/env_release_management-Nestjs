import { Pipe, PipeTransform } from '@angular/core';
import {StatusTransaction} from "../models/status-transaction";

@Pipe({
  name: 'pendingRequests'
})
export class PendingRequestsPipe implements PipeTransform {

   transform(input): any {
     console.log(input)
     const x = input.find( (elt) => {
       if (elt === StatusTransaction.pending) return true
     })
    if (x) {
      return input
    }
  }

}
