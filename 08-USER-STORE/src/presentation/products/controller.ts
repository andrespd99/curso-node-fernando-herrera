import { Request, Response } from "express";
import { Validators } from "../../config/validators";
import { CreateProductDTO, CustomError, PaginationDTO } from "../../domain";
import { ProductService } from "../services/product.service";
import { handleError } from "../utils/handlers";



export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    createProduct = async (req: Request, res: Response) => {
        try {

            const [error, dto] = CreateProductDTO.create({
                ...req.body,
                user: req.body.user.id,
            });
            if (error) throw CustomError.badRequest(error);

            const response = await this.productService.createProduct(dto!);

            res.json(response);
        } catch (error) {
            handleError(error, res);
        }
    }

    getProduct = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!Validators.isMongoID(id)) throw CustomError.badRequest('`id` is not a valid Mongo ID');

            const response = await this.productService.getProduct(id);

            res.json(response);
        } catch (error) {
            handleError(error, res);
        }
    }

    getProducts = async (req: Request, res: Response) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const [error, dto] = PaginationDTO.create(+page, +limit);

            if (error) throw CustomError.badRequest(error);

            const response = await this.productService.getProducts(dto!);

            res.json(response);
        } catch (error) {
            handleError(error, res);
        }
    }
}