import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { ILogRepository } from "../../repositories/log.repository";

export interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: ILogRepository,
        private readonly onSuccess: SuccessCallback,
        private readonly onError: ErrorCallback,
    ) { }

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on service check in`);
            }

            const log = new LogEntity({
                message: `Service OK - ${url}`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts',
            });
            this.logRepository.saveLog(log);

            this.onSuccess?.();


            return true;
        } catch (error) {
            const log = new LogEntity({
                message: `Service ERROR - ${url}: ${error}`,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts',
            });
            this.logRepository.saveLog(log);

            this.onError?.(`${error}`)

            return false;
        }

    }
}