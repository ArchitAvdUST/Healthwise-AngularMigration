import express from "express";
import { connectDb } from "./connectDB";
import patientRoutes from "./routes/patientRoutes";

const app = express();
app.use(express.json());

const port = 5002;

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

connectDb();

app.use('/api',patientRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

