const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];

    const { argv } = await import('../../../src/plugins/args.plugin');

    return argv;
}

describe('args.plugin', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return default values', async () => {

        const argv = await runCommand(['-b', '10'])

        expect(argv).toEqual(
            expect.objectContaining({
                b: 10,
                l: 10,
                s: false,
                d: './outputs',
            }));
    });
    test('should return configuration with custom values', async () => {

        const argv = await runCommand(['-b', '5', '-l', '12', '-s', '-n', 'test.txt', '-d', 'custom-output'])

        expect(argv).toEqual(
            expect.objectContaining({
                b: 5,
                l: 12,
                s: true,
                d: 'custom-output',
                n: 'test.txt',
            }));

    });
    // test('should throw error when base is lesser than 1', async () => {

    //     const argv = await runCommand(['-b', '0'])

    //     expect(argv).toThrow()

    // });

})