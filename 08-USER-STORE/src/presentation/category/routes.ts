import { Router } from 'express';
import { AuthMiddleware } from '../middlerwares/auth.middleware';
import { CategoryService } from '../services/category.service';
import { CategoryController } from './controller';




export class CategoryRoutes {


    static get routes(): Router {
        const router = Router();
        const service = new CategoryService();
        const categoryController = new CategoryController(service);


        router.post('/', [AuthMiddleware.validateJWT], categoryController.createCategory);
        router.get('/', categoryController.getCategories);
        router.get('/:id', categoryController.getCategory);
        router.patch('/:id', categoryController.updateCategory);
        router.delete('/:id', categoryController.deleteCategory);

        return router;
    }
}

