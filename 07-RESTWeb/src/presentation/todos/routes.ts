import { Router } from "express";
import { TodosController } from "./controller";





export class TodosRoutes {

    static get routes(): Router {
        const router = Router();

        const todoController = new TodosController();

        router.get('/', todoController.getTodos);
        router.post('/', todoController.createTodo);
        router.get('/:id', todoController.getTodoById);
        router.delete('/:id', todoController.deleteTodo);
        router.patch('/:id', todoController.updateTodo);

        return router;
    }
}