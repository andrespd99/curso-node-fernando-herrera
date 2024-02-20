import { LogRepository } from "../../../infraestructure/repositories/log.repository";
import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";


interface SendLogsUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendLogs implements SendLogsUseCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(to: string | string[]) {

        try {
            const sent = await this.emailService.sendEmailWithLogs(to);
            if (!sent) {
                throw Error(`Email logs not sent`);
            }
            const log = new LogEntity({
                message: `Email sent successfuly `,
                level: LogSeverityLevel.low,
                origin: 'email.service.ts'
            });
            this.logRepository.saveLog(log);
            return true;
        } catch (error) {


            const log = new LogEntity({
                message: `Email could not be sent. Error: ${error}`,
                level: LogSeverityLevel.medium,
                origin: 'email.service.ts'
            });
            this.logRepository.saveLog(log);
            return false
        }
    }

}