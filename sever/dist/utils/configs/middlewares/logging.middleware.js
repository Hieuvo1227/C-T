/**
 * Middleware ghi log các request
 */
export const requestLogger = (req, res, next) => {
    console.log(`\n📨 ${req.method} ${req.path}`);
    console.log('📋 Headers:', req.headers);
    if (Object.keys(req.query).length > 0)
        console.log('❓ Query:', req.query);
    if (Object.keys(req.body).length > 0)
        console.log('📦 Body:', req.body);
    next();
};
/**
 * Middleware xử lý và trả về lỗi
 */
export const errorResponse = (err, req, res, next) => {
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
export const checkQPS = (req, res, next) => {
    requests++;
    next();
};
