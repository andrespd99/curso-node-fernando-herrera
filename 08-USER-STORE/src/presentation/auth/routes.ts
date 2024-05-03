import { Router } from 'express';
import { envs } from '../../config';
import { EmailService } from '../services';
import { AuthService } from '../services/auth.service';
import { AuthController } from './controller';




export class AuthRoutes {


    static get routes(): Router {

        const router = Router();

        const emailService = new EmailService({
            mailerEmail: envs.MAILER_EMAIL,
            mailerSecret: envs.MAILER_SECRET_KEY,
            mailerService: envs.MAILER_SERVICE,
        });
        const authService = new AuthService(emailService);
        const authController = new AuthController(authService);

        router.post('/login', authController.login);
        router.post('/register', authController.register);
        router.get('/validate-email/:token', authController.verifyEmail);

        return router;
    }
}

