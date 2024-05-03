import { Request, Response } from "express";
import { LoginDTO } from "../../domain/dtos/auth/login.dto";
import { RegisterUserDTO } from "../../domain/dtos/auth/register-user.dto";
import { AuthService } from "../services/auth.service";
import { handleError } from "../utils/handlers";


export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    login = async (req: Request, res: Response) => {
        try {
            const [error, dto] = LoginDTO.create(req.body);

            if (error) return res.status(400).json({ error });

            const user = await this.authService.login(dto!);

            res.json(user);
        } catch (error) {
            handleError(error, res);
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            const [error, dto] = RegisterUserDTO.create(req.body);

            if (error) return res.status(400).json({ error });

            const user = await this.authService.registerUser(dto!);

            res.json(user);
        } catch (error) {
            handleError(error, res);
        }
    }

    async validateEmail(req: Request, res: Response) {
        res.json('validateEmail');

    }
}