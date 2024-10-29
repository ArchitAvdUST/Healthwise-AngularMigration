import express from "express";
import { connectDb } from "./connectDb";
import timingRoutes from "./routes/timingRoutes";

const app = express();
app.use(express.json());

const port = 5009;

connectDb();

app.use('/api',timingRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

