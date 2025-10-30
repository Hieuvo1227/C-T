export const RequestHandlerCustom = (handler) => {
    return async (req, res, next) => {
        try {
            await Promise.resolve(handler(req, res, next));
        }
        catch (error) {
            console.error(">>> ", error);
            next(error);
        }
        ;
    };
};
export const HandlerCustom = (handler) => {
    return async (...args) => {
        try {
            return await handler(...args);
        }
        catch (error) {
            console.error(">>> ", error);
            throw error;
        }
        ;
    };
};
export class ErrorCustom extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
