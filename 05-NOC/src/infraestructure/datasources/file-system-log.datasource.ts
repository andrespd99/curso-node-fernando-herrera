import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogFiles();
    }

    private createLogFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(path => {
            if (fs.existsSync(path)) return;

            fs.writeFileSync(path, '');
        })
    }

    async saveLog(log: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(log)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJson);

        switch (log.level) {
            case LogSeverityLevel.medium:
                fs.appendFileSync(this.mediumLogsPath, logAsJson);
                break;
            case LogSeverityLevel.high:
                fs.appendFileSync(this.highLogsPath, logAsJson);
                break;
            default:
                break;
        }
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const getLogContent = (path: string) =>
            fs.readFileSync(path, { encoding: 'utf-8' });


        let logsContent: string;


        switch (severityLevel) {
            case LogSeverityLevel.high:
                logsContent = getLogContent(this.highLogsPath);
                break;
            case LogSeverityLevel.medium:
                logsContent = getLogContent(this.mediumLogsPath);
                break;
            default:
                logsContent = getLogContent(this.allLogsPath);
                break;
        }

        if (logsContent.trim() === '') return []

        const logs = logsContent.split('\n').map(LogEntity.fromJson);

        return logs;
    }

}