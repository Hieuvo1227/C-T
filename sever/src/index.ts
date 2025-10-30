import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { PORT } from './utils/configs/constants.js';
import connectDatabase from './utils/libs/database.js';
import { errorResponse } from './utils/configs/middlewares/logging.middleware.js';
import { applyMiddlewares } from './utils/configs/middlewares/middlewares.js';
import router from './routes/routes.js';

const app = express();

// Áp dụng tất cả middleware
applyMiddlewares(app);

// Kết nối đến cơ sở dữ liệu và khởi tạo root user
connectDatabase();

// Đăng ký tất cả các route với tiền tố /api
app.use("/api", router);

// Add error handling middleware AFTER routes
app.use(errorResponse);

app.listen(parseInt(PORT), '0.0.0.0', () => {
  console.log(`🚀 Sever đang chạy trên cổng ${PORT} (0.0.0.0)`);
  console.log(`📱 Accessible from: http://192.168.100.254:${PORT}`);
});
