import { CategoryModel, UserModel } from "../../data";
import { CategoryEntity, CreateCategoryDTO, CustomError, PaginationDTO, UpdateCategoryDTO } from "../../domain";



export class CategoryService {
    constructor() { }



    async createCategory(dto: CreateCategoryDTO): Promise<CategoryEntity> {
        try {
            const { name, available, userId } = dto;
            const user = await UserModel.findById(userId);

            if (!user) throw CustomError.badRequest('User with userId not found');

            const existingCategory = await CategoryModel.findOne({ name: dto.name });

            if (existingCategory) throw CustomError.badRequest('This category already exists')

            const category = await CategoryModel.create({ name, available, user: userId, });

            await category.save();

            const entity = CategoryEntity.fromObject(category);

            return entity;
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal(`${error}`);
        }
    }
    async getCategory(id: string) {
        try {
            const category = await CategoryModel.findById(id);

            if (!category) throw CustomError.badRequest('Category not found')

            return CategoryEntity.fromObject(category);

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal(`${error}`);
        }
    }
    async getCategories(dto: PaginationDTO) {
        try {
            const { page, limit } = dto;

            // const total = await CategoryModel.countDocuments();
            // const categories = await CategoryModel.find().skip((page - 1) * limit).limit(limit);

            // NOTE: Faster than the former (is it?)
            const [total, categories] = await Promise.all([
                await CategoryModel.countDocuments(),
                await CategoryModel.find().skip((page - 1) * limit).limit(limit),
            ]);


            const entities = categories.map((e) => {
                return CategoryEntity.fromObject(e);
            });

            return {
                page: page,
                limit: limit,
                total: total,
                next: (page * limit < total) ? `api/categories?page=${page + 1}&limit=${limit}` : null,
                prev: (page - 1 > 0) ? `api/categories?page=${page - 1}&limit=${limit}` : null,
                categories: entities,
            };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal(`${error}`);
        }
    }
    async updateCategory(dto: UpdateCategoryDTO) {
        try {
            const { id, name, available } = dto;
            const category = await CategoryModel.findByIdAndUpdate(id, { name, available });
            if (!category) throw CustomError.badRequest('Category not found')
            const updatedCategory = await CategoryModel.findById(id);

            return CategoryEntity.fromObject(updatedCategory!);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal(`${error}`);
        }
    }
    async deleteCategory(id: string) {
        try {
            const category = await CategoryModel.findByIdAndDelete(id);
            if (!category) throw CustomError.badRequest('Category not found')

            return CategoryEntity.fromObject(category);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal(`${error}`);
        }
    }


}
