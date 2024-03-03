import { env } from "../config/plugins/env.plugin";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemLogDatasource } from "../infraestructure/datasources/file-system-log.datasource";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { LogRepository } from "../infraestructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const logRepositoryPostgres = new LogRepository(
    new PostgresLogDatasource(),
);
const logRepositoryMongo = new LogRepository(
    new MongoLogDatasource(),
);
const logRepositoryFs = new LogRepository(
    new FileSystemLogDatasource(),
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

        // TO SEND EMAILS
        // console.log('Server started...');

        // new SendLogs(emailService, logRepository)

        // emailService.sendEmailWithLogs(
        //     [
        //         'andres.epacheco99@gmail.com',
        //     ]
        // )


        // TO SET CRON JOBS
        CronService.createJob(
            '*/4 * * * * *',
            () => {

                const url = 'https://www.google.com'

                new CheckServiceMultiple(
                    [
                        logRepositoryPostgres,
                        logRepositoryMongo,
                        logRepositoryFs,
                    ],
                    () => console.log(`Service OK - ${url}`),
                    () => console.log(`Service ERROR - ${url}`)
                ).execute(url);
                // new CheckService(
                //     logRepositoryPostgres,
                //     () => console.log(`Service OK - ${url}`),
                //     () => console.log(`Service ERROR - ${url}`)
                // ).execute(url);
            }
        )

    }
}