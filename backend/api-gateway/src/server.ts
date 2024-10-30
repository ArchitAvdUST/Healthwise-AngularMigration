// src/index.ts
import express from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { PORT, services } from './config';

const app = express();
app.use(express.json());

// Configure routes for each service
services.forEach(({ route, target }) => {
  const proxyOptions: Options = {
    target,
    changeOrigin: true,
    pathRewrite: { [`^${route}`]: '' },
  };

  app.use(route, createProxyMiddleware(proxyOptions));
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
