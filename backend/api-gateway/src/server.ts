import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
// import { authorize } from './middleware/authMiddleware';

const app = express();
const PORT = 5000;

app.use(
  '/api/doctors',
  createProxyMiddleware({ target: 'http://localhost:5001/api/doctors', changeOrigin: true })
);

app.use(
  '/api/patients',
  createProxyMiddleware({ target: 'http://localhost:5002/api/patients', changeOrigin: true })
);

app.use(
  '/api/admins',
  createProxyMiddleware({ target: 'http://localhost:5003/api/admins', changeOrigin: true })
);

app.use(
  '/api/appointments',
  createProxyMiddleware({ target: 'http://localhost:5004/api/appointments', changeOrigin: true })
);

app.use(
  '/api/reports',
  createProxyMiddleware({ target: 'http://localhost:5005/api/reports', changeOrigin: true })
);

app.use(
  '/api/histories',
  createProxyMiddleware({ target: 'http://localhost:5006/api/histories', changeOrigin: true })
);

app.use(
  '/api/billings',
  createProxyMiddleware({ target: 'http://localhost:5007/api/billings', changeOrigin: true })
);

app.use(
  '/api/pharmacies',
  createProxyMiddleware({ target: 'http://localhost:5008/api/pharmacies', changeOrigin: true })
);

app.use(
  '/api/timings',
  createProxyMiddleware({ target: 'http://localhost:5009/api/timings', changeOrigin: true })
);

app.use(
  '/api/users',
  createProxyMiddleware({ target: 'http://localhost:5010/api/users', changeOrigin: true })
);



app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});