import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepository } from "../infraestructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";


const logRepository = new LogRepository(
    new FileSystemDatasource(),
);

export class Server {
    static start() {
        console.log('Server started...');

        CronService.createJob(
            '*/4 * * * * *',
            () => {

                const url = 'https://www.goooooooogle.com'

                new CheckService(
                    logRepository,
                    () => console.log(`Service OK - ${url}`),
                    () => console.log(`Service ERROR - ${url}`)
                ).execute(url);
            }
        )

    }
}