import { Router } from "express";
import { TodoDatasourcePostgres } from "../../infraestructure/datasource/todo.datasource.postgres";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.impl";
import { TodosController } from "./controller";





export class TodosRoutes {

    static get routes(): Router {
        const router = Router();

        const todoDatasource = new TodoDatasourcePostgres();
        const todoRepository = new TodoRepositoryImpl(todoDatasource);

        const todoController = new TodosController(todoRepository);

        router.get('/', todoController.getTodos);
        router.post('/', todoController.createTodo);
        router.get('/:id', todoController.getTodoById);
        router.delete('/:id', todoController.deleteTodo);
        router.patch('/:id', todoController.updateTodo);

        return router;
    }
}