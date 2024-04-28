import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {

    constructor(private readonly datasource: TodoDatasource) { }

    createTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.createTodo(createTodoDto);
    }
    getAllTodos(): Promise<TodoEntity[]> {
        return this.datasource.getAllTodos();
    }
    findTodoById(id: string): Promise<TodoEntity> {
        return this.datasource.findTodoById(id);
    }
    updateTodo(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateTodo(updateTodoDto);
    }
    deleteTodo(id: string): Promise<TodoEntity> {
        return this.datasource.deleteTodo(id);
    }
}