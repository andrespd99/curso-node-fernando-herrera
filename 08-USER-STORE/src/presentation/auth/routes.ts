import { Router } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthController } from './controller';




export class AuthRoutes {


    static get routes(): Router {

        const router = Router();

        const authService = new AuthService();
        const authController = new AuthController(authService);

        router.post('/login', authController.login);
        router.post('/register', authController.register);
        router.get('/validate-email/:token', authController.validateEmail);

        return router;
    }
}

