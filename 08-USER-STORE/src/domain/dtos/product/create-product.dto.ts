import { Validators } from "../../../config/validators";

export class CreateProductDTO {
    private constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly user: string,
        public readonly category: string,
        public readonly available: boolean,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateProductDTO?] {
        const { name, description, price, user, category, available } = props;


        if (!name) return ['`name` parameter is required']
        if (!description) return ['`description` parameter is required']

        if (!category) return ['`category` parameter is required']
        if (!Validators.isMongoID(category)) return ['`category` is not a valid Mongo ID']

        if (!user) return ['`user` parameter is required']
        if (!Validators.isMongoID(user)) return ['`user` is not a valid Mongo ID']

        return [undefined, new CreateProductDTO(name, description, price ?? 0, user, category, available ?? true)];
    }
}