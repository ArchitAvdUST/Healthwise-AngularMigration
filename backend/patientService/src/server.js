"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDB_1 = require("./connectDB");
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 5002;
(0, connectDB_1.connectDb)();
app.use('/api', patientRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
