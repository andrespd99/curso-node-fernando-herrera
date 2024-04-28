import { prisma } from "../../data/postgres";
import { TodoModelPostgres } from "../../data/postgres/models/todo.model.postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDatasourcePostgres implements TodoDatasource {




    async createTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto
        });

        return TodoModelPostgres.fromObject(todo).toEntity();
    }

    async getAllTodos(): Promise<TodoEntity[]> {
        const todos = (await prisma.todo.findMany())
            .map(TodoModelPostgres.fromObject);

        return todos.map(todo => todo.toEntity());
    }


    async findTodoById(id: string): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({ where: { id } });

        if (!todo) {
            throw `Todo with id '${id}' not found`;
        }

        return TodoModelPostgres.fromObject(todo).toEntity();
    }
    async updateTodo(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findTodoById(updateTodoDto.id);
        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto.values
        });

        return TodoModelPostgres.fromObject(updatedTodo).toEntity();
    }
    async deleteTodo(id: string): Promise<TodoEntity> {
        await this.findTodoById(id);
        const deletedTodo = await prisma.todo.delete({
            where: { id: id }
        });

        return TodoModelPostgres.fromObject(deletedTodo).toEntity();
    }
}