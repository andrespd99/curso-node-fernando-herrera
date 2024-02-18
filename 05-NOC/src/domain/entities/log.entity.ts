
export enum LogSeverityLevel {
    low = "low",
    medium = 'medium',
    high = 'high',
}

export class LogEntity {

    constructor(
        message: string,
        level: LogSeverityLevel,
    ) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt } = JSON.parse(json);

        if (!message) throw new Error('Log message value not found!')
        if (!level) throw new Error('Log level value not found!')
        if (!createdAt) throw new Error('Log createdAt value not found!')

        const log = new LogEntity(message, level);
        log.createdAt = createdAt;

        return log;
    }
}