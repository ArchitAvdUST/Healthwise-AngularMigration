import express from "express";
import { connectDb } from "./connectDb";
import appointmentRoutes from "./routes/appointmentRoutes";

const app = express();
app.use(express.json());

const port = 5004;

connectDb();

app.use('/api',appointmentRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

