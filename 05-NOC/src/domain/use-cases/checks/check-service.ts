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

            const log = new LogEntity(`Service OK - ${url}`, LogSeverityLevel.low);
            this.logRepository.saveLog(log);

            this.onSuccess?.();


            return true;
        } catch (error) {
            const log = new LogEntity(`Service ERROR - ${url}: ${error}`, LogSeverityLevel.high);
            this.logRepository.saveLog(log);

            this.onError?.(`${error}`)

            return false;
        }

    }
}