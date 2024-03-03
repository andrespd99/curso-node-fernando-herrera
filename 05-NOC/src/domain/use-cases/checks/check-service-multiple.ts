import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { ILogRepository } from "../../repositories/log.repository";

export interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepositories: ILogRepository[],
        private readonly onSuccess: SuccessCallback,
        private readonly onError: ErrorCallback,
    ) { }

    private saveLogs(log: LogEntity) {
        this.logRepositories.forEach(repository => {
            repository.saveLog(log);
        });
    }

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

            this.saveLogs(log);

            this.onSuccess?.();

            return true;
        } catch (error) {
            const log = new LogEntity({
                message: `Service ERROR - ${url}: ${error}`,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts',
            });

            try {
                this.saveLogs(log);
            } catch (error) {
                console.log('Could not log error... Is the logging system offline?')
            }

            this.onError?.(`${error}`)


            return false;
        }

    }
}