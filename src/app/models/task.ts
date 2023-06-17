import {TaskStatus} from './task-status';

export class Task {

    id: string
    title: string
    description: string
    planningId: number
    status: TaskStatus

    constructor() {
        this.title = '';
        this.description = '';
        this.planningId = 0;
    }
}
