import { LogModel } from "../../data/mongo/models/log.model";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        try {
            const newLog = await LogModel.create(log);
            console.log('Mongo Log created: ', newLog.id);

        } catch (error) {

        }
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        try {
            const response = await LogModel.find({
                level: severityLevel,
            })

            return response.map((e) =>
                LogEntity.fromJson(JSON.stringify(e.toJSON()))
            );

        } catch (error) {
            return [];
        }
    }


}