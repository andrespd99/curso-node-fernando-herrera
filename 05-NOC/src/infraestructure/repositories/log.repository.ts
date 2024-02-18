import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { ILogRepository } from "../../domain/repositories/log.repository";


export class LogRepository implements ILogRepository {

    constructor(
        private readonly datasource: LogDatasource,
    ) { }

    async saveLog(log: LogEntity): Promise<void> {
        await this.datasource.saveLog(log);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.datasource.getLogs(severityLevel);
    }
}