export class UpdateTodoDto {
    constructor(
        public readonly id: string,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.text) returnObj.text = this.text;
        if (this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;

    }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {

        const { id, text, completedAt } = props;
        let newCompletedAt;

        if (!id) {
            return ['"id" parameter must be provided']
        }

        if (!text && !completedAt) {
            return ['At least "text" or "completetAt" parameters must be provided']
        }

        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (newCompletedAt.toString() === 'Invalid Date') {
                return ['"completedAt" must be a valid date'];
            }
        }

        return [, new UpdateTodoDto(id, text, newCompletedAt)];
    }
}