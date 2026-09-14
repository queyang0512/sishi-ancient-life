# 古人日常

以中国古代日常生活为核心的传统文化网站。

## 项目结构

- `frontend/`：Vite + React + TypeScript 前端
- `backend/`：Go + Gin API 与 SQLite 数据库

## 本地运行

### 后端

```powershell
cd backend
go run ./cmd/server
```

默认监听 `http://localhost:8080`，健康检查地址为 `http://localhost:8080/api/health`。

### 前端

```powershell
cd frontend
npm install
npm run dev
```

默认访问地址为 `http://localhost:5173`。开发服务器会将 `/api` 请求代理到后端。

