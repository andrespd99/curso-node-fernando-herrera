const { createId } = require('../../src/plugins');



describe('plugins/get-id.plugin.ts', () => {
    test('createId should return UUID', () => {
        const uuid = createId();

        expect(typeof uuid).toBe('string')
        expect(uuid.length).toBe(36)
    })

})