

import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const severityEnum = {
    high: SeverityLevel.HIGH,
    medium: SeverityLevel.MEDIUM,
    low: SeverityLevel.LOW,
}

export class PostgresLogDatasource implements LogDatasource {

    private prisma = new PrismaClient();

    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];
        const newLog = await this.prisma.logModel.create({
            data: {
                ...log,
                level: level,
            }
        });
        console.log('Postgres Log created: ', newLog.id);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const level = severityEnum[severityLevel];

        const response = await this.prisma.logModel.findMany({
            where: {
                level: level,
            }
        })

        return response.map((e) =>
            LogEntity.fromJson(JSON.stringify(e))
        );
    }


}