import express from "express";
import { connectDb } from "./connectDb";
import historyRoutes from "./routes/historyRoutes";

const app = express();
app.use(express.json());

const port = 5006;

connectDb();

app.use('/api',historyRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});