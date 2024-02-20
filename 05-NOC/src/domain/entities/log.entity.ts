
export enum LogSeverityLevel {
    low = "low",
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {

    constructor(options: LogEntityOptions) {
        const { message, level, createdAt, origin } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt ?? new Date();
        this.origin = origin;
    }

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt, origin } = JSON.parse(json);

        if (!message) throw new Error('Log message value not found!')
        if (!level) throw new Error('Log level value not found!')
        if (!createdAt) throw new Error('Log createdAt value not found!')

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        });

        return log;
    }
}