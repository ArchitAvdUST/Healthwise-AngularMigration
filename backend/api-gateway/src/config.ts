// src/config.ts
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;

export const services = [
  { route: '/api/doctors', target: process.env.SERVICE_1_URL },
  { route: '/api/admins', target: process.env.SERVICE_2_URL },
  { route: '/api/appointments', target: process.env.SERVICE_3_URL },
  { route: '/api/billings', target: process.env.SERVICE_4_URL },
  { route: '/api/histories', target: process.env.SERVICE_5_URL },
  { route: '/api/reports', target: process.env.SERVICE_6_URL },
  { route: '/api/patients', target: process.env.SERVICE_7_URL },
  { route: '/api/pharmacies', target: process.env.SERVICE_8_URL },
  { route: '/api/timings', target: process.env.SERVICE_9_URL },
  { route: '/api/users', target: process.env.SERVICE_10_URL }
];
