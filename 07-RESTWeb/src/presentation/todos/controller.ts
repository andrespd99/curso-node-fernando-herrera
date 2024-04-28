import { Request, Response } from "express";
import { TodoRepository } from "../../domain";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";



export class TodosController {

    //* DI
    constructor(
        private repository: TodoRepository
    ) { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.repository.getAllTodos();
        res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const todo = await this.repository.findTodoById(id);

            return res.json(todo);
        } catch (error) {
            res.status(400).json({ error })
        }
    }


    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });

        const todo = await this.repository.createTodo(createTodoDto!);
        res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

            if (error) return res.status(400).json({ error });

            const todo = await this.repository.updateTodo(updateTodoDto!);

            res.json({
                message: 'TODO updated succesfully',
                value: todo,
            });
            return;

        } catch (error) {
            return res.status(40).json({ error });
        }
    }

    public deleteTodo = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const todo = await this.repository.deleteTodo(id);

            res.json({
                message: 'TODO deleted succesfully',
                value: todo,
            });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }



}