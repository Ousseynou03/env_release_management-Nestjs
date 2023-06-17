import { Pipe, PipeTransform } from '@angular/core';
import {AdminTransactions} from '../models/admin-transactions';

@Pipe({
  name: 'columnManager'
})
export class ColumnManagerPipe implements PipeTransform {

    transform(input): any {
      const keys = new AdminTransactions()
      keys.added_by = input.added_by
      keys.date_transaction = input.date_transaction
      keys.montant = input.montant
      keys.status = input.status
      return keys
    }
}
