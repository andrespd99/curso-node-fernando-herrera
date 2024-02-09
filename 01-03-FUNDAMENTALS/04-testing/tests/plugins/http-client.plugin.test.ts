const { httpClientPlugin } = require('../../src/plugins');



describe('plugins/http-client.plugin.ts', () => {
    test('httpClientPlugin() ', () => {
        const uuid = createId();

        expect(typeof uuid).toBe('string')
        expect(uuid.length).toBe(36)
    })

})