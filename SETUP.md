# Setup Hướng Dẫn - C&T Innovation Website

## Yêu Cầu
- Node.js v18+
- MongoDB (chạy local hoặc connection string)
- npm hoặc yarn

## Installation

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd C-T
```

### 2. Setup Backend (Server)
```bash
cd sever
npm install
```

**Tạo file `.env` trong folder `sever/`:**
```env
# Server Configuration
PORT=4040
NODE_ENV=development

# Client URL (Frontend)
CLIENT_URL=http://192.168.100.254:5173,http://localhost:5173,http://www.thanhtoanct.com

# MongoDB Database
DATABASE_MONGO_URL=mongodb://localhost:27017/c-t-database

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Root Admin Account
ROOT_EMAIL=admin@example.com
ROOT_PASSWORD=your-password
JWT_SECRET=your-secret-key
```

### 3. Setup Frontend (Client)
```bash
cd ../client
npm install
```

**Tạo file `.env` trong folder `client/`:**
```env
VITE_API_URL=http://192.168.100.254:4040
VITE_API_BASE_PATH=/api
```

## Chạy Development Mode

**Terminal 1 - Backend:**
```bash
cd sever
npm run dev
```
Backend sẽ chạy tại `http://192.168.100.254:4040`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend sẽ chạy tại `http://localhost:5173` hoặc `http://192.168.100.254:5173`

## Chạy Production Mode

### 1. Build Frontend
```bash
cd client
npm run build
```

### 2. Start Backend (Production)
```bash
cd sever
npm start
```

### 3. Serve Frontend (Production)
```bash
cd client
npx http-server dist -p 5173 --host 192.168.100.254 --cors
```

Hoặc dùng Nginx/Apache để serve `dist/` folder.

## Important Notes

### Environment Variables
- **Không commit `.env` files lên Git** - chỉ commit `.env.example`
- Mỗi developer cần tạo `.env` riêng với credentials của họ
- Email credentials cần từ Gmail App Passwords (không dùng password chính)

### CORS Configuration
- Backend cho phép origins từ `CLIENT_URL` env variable
- Development mode (`NODE_ENV=development`) cho phép tất cả origins
- Production: cập nhật `CLIENT_URL` với domain thực tế

### API URL
- Development: `http://192.168.100.254:4040/api`
- Production: Set `VITE_API_URL` dựa trên production domain

### Database
- Ensure MongoDB đang chạy trên `localhost:27017`
- Hoặc update `DATABASE_MONGO_URL` trong `.env`

### Email Sending
1. Bật 2-Step Verification trên Gmail
2. Tạo App Password tại https://myaccount.google.com/apppasswords
3. Copy 16-character password vào `EMAIL_PASS`

## Troubleshooting

### "Port 4040 already in use"
```bash
# Tìm process sử dụng port 4040
netstat -ano | findstr :4040

# Kill process (Windows)
wmic process where processid=<PID> delete
```

### "Cannot connect to MongoDB"
- Verify MongoDB đang chạy: `mongod`
- Check `DATABASE_MONGO_URL` trong `.env` đúng

### Form submission failed
- Check `VITE_API_URL` trong `client/.env` đúng
- Verify backend CORS config include frontend URL
- Check browser console (F12) để xem network errors

### "CORS blocked"
- Backend phải enable CORS cho frontend origin
- Development: sử dụng `NODE_ENV=development`
- Production: update `CLIENT_URL` env variable

## File Structure
```
C-T/
├── client/           # React frontend
│   ├── src/
│   ├── public/
│   ├── .env         # ⚠️ Don't commit
│   └── dist/        # Build output
├── sever/           # Express backend
│   ├── src/
│   ├── .env         # ⚠️ Don't commit
│   └── package.json
└── README.md
```

## Contact
Nếu có issues, contact team lead hoặc check console logs chi tiết.
