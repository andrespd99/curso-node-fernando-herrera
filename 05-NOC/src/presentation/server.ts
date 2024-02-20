import { env } from "../config/plugins/env.plugin";
import { SendLogs } from "../domain/use-cases/checks/send-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepository } from "../infraestructure/repositories/log.repository";
import { EmailService } from "./email/email.service";


const logRepository = new LogRepository(
    new FileSystemDatasource(),
);
const emailService = new EmailService(
    {
        service: env.MAILER_SERVICE,
        auth: {
            user: env.MAILER_EMAIL,
            pass: env.MAILER_SECRET_KEY,
        }
    }
);

export class Server {
    static start() {
        console.log('Server started...');

        new SendLogs(emailService, logRepository)

        emailService.sendEmailWithLogs(
            [
                'andres.epacheco99@gmail.com',
            ]
        )


        // CronService.createJob(
        //     '*/4 * * * * *',
        //     () => {

        //         const url = 'https://www.goooooooogle.com'

        //         new CheckService(
        //             logRepository,
        //             () => console.log(`Service OK - ${url}`),
        //             () => console.log(`Service ERROR - ${url}`)
        //         ).execute(url);
        //     }
        // )

    }
}