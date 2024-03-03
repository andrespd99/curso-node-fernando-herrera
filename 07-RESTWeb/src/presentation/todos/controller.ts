import { Request, Response } from "express";

const todos = [
    { id: 1, text: 'Buy Milk', createdAt: new Date(), completed: false },
    { id: 2, text: 'Buy bread', createdAt: new Date(), completed: true },
    { id: 3, text: 'Buy butter', createdAt: new Date(), completed: false },
];

export class TodosController {

    //* DI
    constructor() {

    }

    public getTodoById = (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id);

        if (isNaN(id)) return res.status(400).json({ 'error': 'ID argument is not a number' })

        const todo = todos.find((e) => e.id === id);

        (todo)
            ? res.json(todo)
            : res.status(404).json({
                'code': '404',
                'error': `Todo not found`
            });
    }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    }

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;

        if (text) {
            const newTodo = {
                id: (todos.at(-1)?.id ?? 0) + 1,
                text: text,
                createdAt: new Date(),
                completed: false,
            };

            todos.push(newTodo);

            res.json({
                message: 'TODO added!',
                value: newTodo,
            });

            return;
        }

        res.status(400).json({
            code: 400,
            error: 'Bad request: Missing parameters'
        })

    }
    public deleteTodo = (req: Request, res: Response) => {

        if (!req.params.id) {
            res.status(400).json({
                code: 400,
                error: 'Missing required "id" parameter'
            });
            return;
        }

        const id = Number.parseInt(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({
                code: 400,
                error: 'ID must be of type number'
            });
            return;
        }

        const todo = todos.find(e => e.id === id);


        if (!todo) {
            res.status(404).json({
                code: 404,
                error: 'TODO not found'
            })
            return;
        }

        const index = todos.indexOf(todo);
        delete todos[index];
        res.json({
            message: 'TODO deleted succesfully',
            value: todo,
        });

    }

    public updateTodo = (req: Request, res: Response) => {

        if (!req.params.id) {
            res.status(400).json({
                code: 400,
                error: 'Missing required "id" parameter'
            });
            return;
        }

        const id = Number.parseInt(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({
                code: 400,
                error: 'ID must be of type number'
            });
            return;
        }

        const todo = todos.find(e => e.id === id);


        if (!todo) {
            res.status(404).json({
                code: 404,
                error: 'TODO not found'
            })
            return;
        }

        const index = todos.indexOf(todo);

        const { text, createdAt, completed } = req.body;

        if (!text && !createdAt && !completed) {
            res.status(400).json({
                error: 400,
                message: 'Missing parameter: either "text", "createdAt" or "completed" parameter must be provided',
            });
        }

        todos[index] = {
            id,
            text: text ?? todo.text,
            completed: completed ?? todo.completed,
            createdAt: createdAt ?? todo.createdAt,
        };

        res.json({
            message: 'TODO updated succesfully',
            value: todos[index],
        });
        return;
    }

}