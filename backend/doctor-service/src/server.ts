import express from "express";
import { connectDb } from "./connectDb";
import doctorRoutes from "./routes/doctorRoutes";

const app = express();
app.use(express.json());

const port = 5001;

connectDb();

app.use('/api',doctorRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


