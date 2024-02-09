import fs from 'fs';

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {

    constructor(
        /** repository: StorageRepository */
    ) { }

    execute({
        fileContent,
        fileDestination = 'outputs',
        fileName = 'table',
    }: Options) {
        try {
            fs.mkdirSync(fileDestination, { recursive: true })

            let _fileName = fileName;
            if (!fileName.endsWith('.txt')) {
                _fileName = fileName + '.txt'
            }

            fs.writeFileSync(`${fileDestination}/${_fileName}`, fileContent);
            return true;
        } catch (error) {
            return false;
        }
    }
}