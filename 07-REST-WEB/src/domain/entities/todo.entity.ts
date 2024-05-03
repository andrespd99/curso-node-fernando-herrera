export class TodoEntity {

    constructor(
        public id: string,
        public text: string,
        public completedAt?: Date | null
    ) { }

    get isCompleted() {
        return !!this.completedAt;
    }
}