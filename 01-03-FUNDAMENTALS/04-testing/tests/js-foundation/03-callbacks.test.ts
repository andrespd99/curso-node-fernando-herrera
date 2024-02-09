import { getUserById } from '../../src/js-foundation/03-callbacks';


describe('js-foundation/03-callbacks.ts', () => {

  test('getUserById should return error', ()  => {
    const invalidId = 10;

    getUserById(invalidId, (err, user) => {
      expect(err).toBe(`User not found with id ${invalidId}`);
      expect(user).toBe(undefined);
    });
  })
  test('user with id 1 should be "John"', ()  => {
    const id = 1;
    const expectedResult = {
      id: 1,
      name: 'John',
  } 

    getUserById(id, (err, user) => {
      expect(err).toBe(undefined);
      expect(user).toEqual(expectedResult);
    });
  })

})