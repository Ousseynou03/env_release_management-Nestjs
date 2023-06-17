export class Activity {

    id: string
    description: string
    start_date: Date
    end_date: Date

    constructor() {
        this.start_date = new Date();
        this.end_date = new Date();
        this.description = '';
    }
}
