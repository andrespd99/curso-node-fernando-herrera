import { Request, Response } from "express";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";




// Controller with Domain Driven Design (DDD) structure
export class TodosController {

    //* DI
    constructor(
        private repository: TodoRepository
    ) { }

    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.repository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({ error }));
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = req.params.id;

        new GetTodo(this.repository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    }


    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });

        new CreateTodo(this.repository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

        if (error) return res.status(400).json({ error });

        return new UpdateTodo(this.repository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo)).catch(error => res.status(400).json({ error }));
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = req.params.id;
        new DeleteTodo(this.repository)
            .execute(id)
            .then(todo => res.json({
                message: 'TODO deleted succesfully',
                value: todo,
            }))
            .catch(error => res.status(400).json({ error }));
    }



}