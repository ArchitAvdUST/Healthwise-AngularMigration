import express from "express";
import { connectDb } from "./connectDB";
import patientRoutes from "./routes/patientRoutes";

const app = express();
app.use(express.json());

const port = 5002;

connectDb();

app.use('/api',patientRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

