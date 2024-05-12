export class UpdateCategoryDTO {

    private constructor(
        public readonly id: string,
        public readonly name?: string | undefined,
        public readonly available?: boolean | undefined,
    ) { }

    static create(object: { [key: string]: any }): [string?, UpdateCategoryDTO?] {
        const { id, name, available } = object;
        let _available = available;

        if (!id) return ['Missing `id` parameter']
        if (!name && available == null) return ['Either `name` or `available` parameter must be provided'];

        if (available && typeof available !== 'boolean') {
            _available = !(available === 'false');
        }

        return [undefined, new UpdateCategoryDTO(id, name, _available)];
    }
}