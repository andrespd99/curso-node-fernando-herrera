import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string | undefined;
    destination: string;
}


export class ServerApp {
    static async run(options: RunOptions) {
        console.log('Server running...');
        const { base, limit } = options;
        const table = new CreateTable().execute({ base, limit })
        const wasSaved = new SaveFile().execute({
            fileContent: table,
            fileName: options.fileName ?? `table-${options.base}`,
            fileDestination: options.destination
        });

        if (options.showTable) console.log(table);

        wasSaved
            ? console.log('File created!')
            : console.error('Error: File could not be saved');

    }
}