import { ProductModel } from "../../data";
import { CreateProductDTO, CustomError, PaginationDTO } from "../../domain";

export class ProductService {

    async createProduct(dto: CreateProductDTO) {
        try {
            const product = new ProductModel(dto);

            await product.save();

            return product;
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            throw CustomError.internal();
        }
    }

    async getProduct(id: string) {
        try {
            const product = await ProductModel.findById(id)
                .populate('user', 'name email')
                .populate('category', 'name');

            if (!product) throw CustomError.notFound('Product not found');

            return product;
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            throw CustomError.internal();
        }
    }

    async getProducts(dto: PaginationDTO) {
        try {
            const { page, limit } = dto;

            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip(page)
                    .limit((page - 1) * limit)
                    .populate('user')
            ]);


            return {
                page,
                limit,
                total,
                next: (total < page * limit) ? `api/products?page=${page + 1}&limit=${limit}` : null,
                prev: (page > 1) ? `api/products?page=${page - 1}&limit=${limit}` : null,
                products,
            };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            throw CustomError.internal();
        }
    }



}