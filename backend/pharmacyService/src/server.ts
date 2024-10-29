import express from "express";
import { connectDb } from "./connectDb";
import pharmacyRoutes from "./routes/pharmacyRoutes";

const app = express();
app.use(express.json());

const port = 5008;

connectDb();

app.use('/api',pharmacyRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

