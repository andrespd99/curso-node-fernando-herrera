

import { buildMakePerson } from '../../src/js-foundation/05-factory-funcs';


describe('js-foundation/05-factory-funcs.ts', () => {
    const mockGetUUID = () => '12345';
    const mockGetAge = (birthdate: string) => 18;
    test('buildMakePerson should return a function', () => {
        const makePerson = buildMakePerson({ getUUID: mockGetUUID, getAge: mockGetAge })

        expect(typeof makePerson).toBe('function')
    })

    test('makePerson should return a person', () => {
        const makePerson = buildMakePerson({ getUUID: mockGetUUID, getAge: mockGetAge })

        const person = makePerson({ name: 'Andres', birthdate: '1999-01-20' });

        const expectedResult = { id: '12345', age: 18, name: 'Andres', birthdate: '1999-01-20' };

        expect(person).toEqual(expectedResult);

    })
});