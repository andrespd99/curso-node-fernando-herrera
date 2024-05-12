import { Router } from "express";
import { AuthMiddleware } from "../middlerwares/auth.middleware";
import { ProductService } from "../services/product.service";
import { ProductController } from "./controller";

export class ProductRoutes {



    static get routes(): Router {
        const router = Router();

        const service = new ProductService();
        const controller = new ProductController(service);

        router.post('/', [AuthMiddleware.validateJWT], controller.createProduct);
        router.get('/', controller.getProducts);
        router.get('/:id', controller.getProduct);

        return router;
    }
}