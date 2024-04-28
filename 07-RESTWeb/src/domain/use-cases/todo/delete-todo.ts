import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface DeleteTodoUseCase {
    execute(id: string): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {
    constructor(
        private readonly repository: TodoRepository
    ) { }

    execute(id: string): Promise<TodoEntity> {
        return this.repository.deleteTodo(id);
    }
}