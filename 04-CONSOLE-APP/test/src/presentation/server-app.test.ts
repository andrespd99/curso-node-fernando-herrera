import { CreateTable } from '../../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import { ServerApp } from '../../../src/presentation/server-app';
describe('ServerApp', () => {
    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        destination: 'test-destination',
        fileName: 'test-fileName',
    }

    beforeEach(() => {

        jest.clearAllMocks()
    })

    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('should run ServerApp with mocked use case implementations', () => {
        const createTableMockReturnValue = '1 x 2 = 2';
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue(createTableMockReturnValue);
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        const { base, limit } = options;
        const { destination, fileName } = options;

        expect(logMock).toHaveBeenCalledWith('Server running...')
        expect(createTableMock).toHaveBeenCalledWith({ base, limit })
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: createTableMockReturnValue,
            fileDestination: destination,
            fileName,
        })
        expect(logMock).toHaveBeenLastCalledWith('File created!')
        expect(logErrorMock).not.toHaveBeenCalled()
    });
    test('should run log error if save file returns false', () => {
        const createTableMockReturnValue = '1 x 2 = 2';
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue(createTableMockReturnValue);
        const saveFileMock = jest.fn().mockReturnValue(false);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logErrorMock).toHaveBeenCalledWith('Error: File could not be saved')
    });
    test('should show table on console if showTable is true', () => {
        const createTableMockReturnValue = '1 x 2 = 2';
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue(createTableMockReturnValue);
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;

        let customOptions = options

        customOptions.showTable = true

        ServerApp.run(customOptions);

        expect(logMock).toHaveBeenCalledWith(createTableMockReturnValue);
    });
    test('should create file with default fileName', () => {
        const createTableMockReturnValue = '1 x 2 = 2';
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue(createTableMockReturnValue);
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;

        const { base, destination, limit, showTable } = options

        ServerApp.run({ base, destination, limit, showTable, fileName: undefined });

        expect(saveFileMock).toHaveBeenCalledWith(expect.objectContaining({
            fileName: `table-${base}`
        }));
    });
})