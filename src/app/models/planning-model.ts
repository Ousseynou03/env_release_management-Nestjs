export class Planning {

    id: string
    planning_name: string
    start_date: Date
    end_date: Date

    constructor() {
        this.start_date = new Date();
        this.end_date = new Date();
        this.planning_name = '';
    }
}
