import { Request, Response } from "express";
import { CreateCategoryDTO, CustomError, PaginationDTO, UpdateCategoryDTO } from "../../domain";
import { CategoryService } from "../services/category.service";
import { handleError } from "../utils/handlers";


export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService,
    ) { }

    createCategory = async (req: Request, res: Response) => {
        try {
            const [error, dto] = CreateCategoryDTO.create({ userId: req.body.user.id, ...req.body });

            if (error) throw CustomError.badRequest(error);

            const category = await this.categoryService.createCategory(dto!);

            res.json(category);
        } catch (error) {
            handleError(error, res);
        }

    }
    getCategory = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) throw CustomError.badRequest('Missing `id` parameter');
            const category = await this.categoryService.getCategory(id);
            res.json(category);
        } catch (error) {
            handleError(error, res);
        }
    }
    getCategories = async (req: Request, res: Response) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const [error, dto] = PaginationDTO.create(+page, +limit);

            if (error) throw CustomError.badRequest(error);

            const categories = await this.categoryService.getCategories(dto!);

            res.json(categories);
        } catch (error) {
            handleError(error, res);
        }
    }
    deleteCategory = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) throw CustomError.badRequest('Missing `id` parameter');
            const categories = await this.categoryService.deleteCategory(id);
            res.json(categories);
        } catch (error) {
            handleError(error, res);
        }
    }
    updateCategory = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const [error, dto] = UpdateCategoryDTO.create({ id, ...req.body });

            if (error) throw CustomError.badRequest(error);

            const category = await this.categoryService.updateCategory(dto!);

            res.json(category);
        } catch (error) {
            handleError(error, res);
        }
    }

}