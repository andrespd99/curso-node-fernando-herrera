import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";



export class TodosController {

    //* DI
    constructor() {

    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = req.params.id;

        if (id === undefined) return res.status(400).json({ error: '"id" parameter missing' });


        const todo = await prisma.todo.findUnique({ where: { id } });

        if (!todo) {
            return res.status(404).json({ error: `Todo not found` },);
        }

        return res.json(todo);
    }

    public getTodos = async (req: Request, res: Response) => {
        try {
            const todos = await prisma.todo.findMany();
            res.json(todos);
        } catch (error) {
            res.status(500);
        }
    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        const todo = await prisma.todo.create({ data: createTodoDto! });

        res.json(todo);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                error: '"id" parameter missing'
            });
        }


        const todo = await prisma.todo.delete({ where: { id } });


        if (!todo) {
            return res.status(404).json({
                error: 'TODO not found'
            })
        }

        res.json({
            message: 'TODO deleted succesfully',
            value: todo,
        });
    }

    public updateTodo = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });


            if (error) {
                return res.status(400).json({ error });
            }

            const todo = await prisma.todo.update({
                where: { id },
                data: updateTodoDto!.values
            });

            if (!todo) {
                return res.status(404).json({
                    error: 'TODO not found'
                })
            }

            res.json({
                message: 'TODO updated succesfully',
                value: todo,
            });
            return;

        } catch (error) {
            return res.status(500).json({
                error: 'Unknown server error',
            });
        }
    }

}