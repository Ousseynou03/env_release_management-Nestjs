import {StatusTransaction} from './status-transaction';

export class AdminTransactions {

    id: string
    added_by?: string
    montant: number
    date_transaction?: string
    status: StatusTransaction
    ajoute_par: string


    constructor() {
        this.id = Math.random().toString(36).substring(2);
    }
}
