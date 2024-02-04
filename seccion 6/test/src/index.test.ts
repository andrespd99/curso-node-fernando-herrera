
import { ServerApp } from '../../src/presentation/server-app';

describe('index.ts', () => {

    test('should call Server.run with value', async () => {
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'index.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-destination'];

        await import('../../src/index');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            destination: "test-destination",
            fileName: "test-file",
            limit: 5,
            showTable: true
        })
    });

});