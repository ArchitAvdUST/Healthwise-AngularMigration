import express from "express";
import { connectDb } from "./connectDb";
import billingRoutes from "./routes/billingRoutes";

const app = express();
app.use(express.json());

const port = 5007;

connectDb();

app.use('/api',billingRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});