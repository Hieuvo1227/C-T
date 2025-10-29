import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { ErrorCustom } from "../custom.js";

/**
 * Middleware ghi log các request
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`\n📨 ${req.method} ${req.path}`);
    console.log('📋 Headers:', req.headers);
    if (Object.keys(req.query).length > 0) console.log('❓ Query:', req.query);
    if (Object.keys(req.body).length > 0) console.log('📦 Body:', req.body);
    next();
};

/**
 * Middleware xử lý và trả về lỗi
 */
export const errorResponse: ErrorRequestHandler = (err: ErrorCustom, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    console.log(">>> Error Response: ", err);

    return res.status(status).json({
        success: false,
        status,
        message,
    });
};

/**
 * Biến đếm số lượng request
 */
let requests = 0;

/**
 * Middleware đếm và ghi nhận số lượng request
 */
export const checkQPS = (req: Request, res: Response, next: NextFunction) => {
    requests++;
    next();
};