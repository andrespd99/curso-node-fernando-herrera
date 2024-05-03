import { TodoEntity } from "../../../domain";


export class TodoModelPostgres {

    constructor(
        public id: string,
        public text: string,
        public completedAt?: Date | null,
        public createdAt?: Date | null,
        public updatedAt?: Date | null
    ) { }

    public static fromObject(object: { [key: string]: any }): TodoModelPostgres {
        const { id, text, completedAt, createdAt, updatedAt } = object;

        if (!id) throw '`id` is required';

        let _completedAt;
        if (completedAt) {
            _completedAt = new Date(completedAt);

            if (isNaN(_completedAt.getTime())) {
                throw '`completedAt` has invalid date format';
            }
        }

        return new TodoModelPostgres(id, text, completedAt, createdAt, updatedAt);
    }

    public toEntity(): TodoEntity {
        return new TodoEntity(this.id, this.text, this.completedAt);
    }

}