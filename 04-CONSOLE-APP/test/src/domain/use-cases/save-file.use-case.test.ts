import fs from 'fs';
import { SaveFile } from '../../../../src/domain/use-cases/save-file.use-case';


describe('SafeFileUseCase', () => {
    const defaultDestination = 'outputs';
    const defaultFileName = 'table.txt'
    const defaultFilePath = `${defaultDestination}/${defaultFileName}`

    const testOptions = {
        fileContent: 'test content',
        fileName: 'table-tests.txt',
        fileDestination: 'outputs/tests',
    }

    afterEach(() => {
        const outputTestsExists = fs.existsSync(testOptions.fileDestination);
        const defaultExists = fs.existsSync(defaultFilePath);
        if (outputTestsExists) {
            fs.rmSync(testOptions.fileDestination, { recursive: true })
        }
        if (defaultExists) {
            fs.rmSync(defaultFilePath);
        }
    })


    test('should save file with default values', () => {
        const saveFile = new SaveFile()
        const filePath = defaultFilePath;
        const options = {
            fileContent: 'test content',
        }

        const wasSaved = saveFile.execute(options);

        expect(wasSaved).toBeTruthy();

        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(checkFile).toBeTruthy()
        expect(fileContent).toBe(options.fileContent)

        try {
            fs.rmSync(filePath)
        } catch (_) { }
    })

    test('should save file with custom values', () => {
        const saveFile = new SaveFile()
        const filePath = `${testOptions.fileDestination}/${testOptions.fileName}`;
        const wasSaved = saveFile.execute(testOptions);

        expect(wasSaved).toBeTruthy();

        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(checkFile).toBeTruthy()
        expect(fileContent).toBe(testOptions.fileContent)
    })

    test('should return false if folder failed to be created', () => {
        const saveFile = new SaveFile()

        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('Mock error') }
        )

        const wasSaved = saveFile.execute(testOptions)

        expect(wasSaved).toBeFalsy()

        mkdirSpy.mockRestore()
    })

    test('should return false if file failed to be created', () => {
        const saveFile = new SaveFile()

        const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('Mock error') }
        )

        const wasSaved = saveFile.execute(testOptions)

        expect(wasSaved).toBeFalsy()

        writeFileSyncSpy.mockRestore()
    })
})