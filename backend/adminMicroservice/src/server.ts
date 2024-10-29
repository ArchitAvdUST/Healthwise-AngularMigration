import express from "express";
import { connectDb } from "./connectDb";
import adminRoutes from "./routes/adminRoutes";

const app = express();
app.use(express.json());

const port = 5003;

connectDb();

app.use('/api',adminRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

