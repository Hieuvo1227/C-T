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

## Chạy Production Mode (Local)

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

## Production Deployment (Cho Server/Hosting)

### 1. Backend Deployment

**Copy files lên server:**
```bash
scp -r sever/ user@your-server:/path/to/app/
```

**SSH vào server và setup:**
```bash
ssh user@your-server
cd /path/to/app/sever

# Copy .env.example
cp .env.example .env

# Edit .env với production values
nano .env
```

**Cập nhật .env cho Production:**
```env
NODE_ENV=production
PORT=4040
DATABASE_MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/db
CLIENT_URL=https://www.thanhtoanct.com,https://thanhtoanct.com
EMAIL_USER=noreply@thanhtoanct.com
EMAIL_PASS=your-app-password
ROOT_EMAIL=admin@thanhtoanct.com
JWT_SECRET=production-secret-key
```

**Install & Start:**
```bash
npm install --production
npm start
# Hoặc dùng PM2/Forever để keep process running
pm2 start src/index.ts --name "api"
```

### 2. Frontend Deployment

**Build frontend:**
```bash
npm run build
```

**Copy `dist/` folder lên server:**
```bash
scp -r client/dist/* user@your-server:/var/www/thanhtoanct.com/
```

**Cấu hình Nginx (nếu dùng Nginx):**
```nginx
server {
    listen 80;
    server_name www.thanhtoanct.com thanhtoanct.com;

    root /var/www/thanhtoanct.com;
    index index.html;

    # Serve static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Fallback to index.html for SPA routing
    location / {
        try_files $uri /index.html;
    }

    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://localhost:4040/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Kích hoạt SSL (Let's Encrypt):**
```bash
sudo certbot --nginx -d www.thanhtoanct.com -d thanhtoanct.com
```

### 3. API URL Auto-Detection

**Important:** Frontend sẽ **tự động detect API URL** dựa trên:
- Nếu `VITE_API_URL` được set → dùng value đó
- Nếu `VITE_API_URL` trống → tự động infer: `http://{hostname}:4040`
- Nếu hostname là production domain → dùng `{hostname}/api` (proxied qua Nginx)

**Không cần update code** - chỉ cần:
1. Build frontend từ repo
2. Deploy `dist/` folder lên server
3. Cấu hình Nginx proxy `/api/` tới backend

### 4. Troubleshooting Production

**If form submission fails:**
1. Check backend logs: `pm2 logs api`
2. Verify API endpoint: `curl http://localhost:4040/api/contacts`
3. Check browser console (F12) - xem request gửi tới đâu
4. Verify CORS: Backend `CLIENT_URL` phải include production domain
5. Check MongoDB connection: `DATABASE_MONGO_URL` trong .env đúng không

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
