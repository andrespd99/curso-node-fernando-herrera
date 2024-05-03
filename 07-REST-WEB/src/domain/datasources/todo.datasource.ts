import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource {

    abstract createTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

    abstract getAllTodos(): Promise<TodoEntity[]>;

    abstract findTodoById(id: string): Promise<TodoEntity>;

    abstract updateTodo(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;

    abstract deleteTodo(id: string): Promise<TodoEntity>;
}