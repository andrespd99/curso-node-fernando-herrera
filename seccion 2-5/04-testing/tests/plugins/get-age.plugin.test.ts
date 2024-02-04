const { getAge } = require('../../src/plugins');



describe('plugins/get-age.plugin.ts', () => {
    test('getAge should return number', () => {
        const birthDate = '1999-01-20';
        const age = getAge(birthDate);

        expect(typeof age).toBe('number')
    })
    test('getAge should return 0 years', () => {

        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1999);

        const birthDate = '1999-01-20'
        const age = getAge(birthDate);
        expect(age).toBe(0)
        expect(spy).toHaveBeenCalled()
    })
})