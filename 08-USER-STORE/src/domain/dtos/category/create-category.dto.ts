export class CreateCategoryDTO {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly userId: string,
    ) { }


    static create(object: { [key: string]: any }): [string?, CreateCategoryDTO?] {
        const { name, available, userId } = object;
        let _available = available;
        if (!name) return ['name parameter is required']
        if (!userId) return ['userId parameter is required']

        if (typeof available !== 'boolean') {
            _available = !(available === 'false');
        }

        return [undefined, new CreateCategoryDTO(name, _available ?? true, userId)];
    }



}