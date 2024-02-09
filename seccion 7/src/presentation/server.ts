import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
    static start() {
        console.log('Server started...');

        CronService.createJob(
            '*/4 * * * * *',
            () => {

                const url = 'https://www.goooooooogle.com'

                new CheckService(
                    () => console.log(`Service OK - ${url}`),
                    () => console.log(`Service ERROR - ${url}`)
                ).execute(url);
            }
        )

    }
}