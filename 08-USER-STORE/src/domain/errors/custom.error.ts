

export class CustomError extends Error {
    private constructor(
        public readonly message: string,
        public readonly statusCode: number,
    ) {
        super(message);
    }


    static badRequest(message: string) {
        return new CustomError(message, 400);
    }

    static unauthorized(message: string) {
        return new CustomError(message, 401);
    }

    static forbidden(message: string) {
        return new CustomError(message, 403);
    }

    static notFound(message: string) {
        return new CustomError(message, 404);
    }

    static conflict(message: string) {
        return new CustomError(message, 409);
    }

    static internal(message?: string) {
        console.log(`Status 500: ${message ?? 'Internal server error'}`)
        return new CustomError('Internal server error', 500);
    }
}