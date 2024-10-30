import express from "express";
import { connectDb } from "./connectDb";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

const port = 5010;

connectDb();

app.use('/api',userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});