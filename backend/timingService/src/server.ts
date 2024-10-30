import express from "express";
import { connectDb } from "./connectDb";
import timingRoutes from "./routes/timingRoutes";

const app = express();
app.use(express.json());

const port = 5009;

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

connectDb();

app.use('/api',timingRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

