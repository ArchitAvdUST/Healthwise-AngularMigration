import express from "express";
import { connectDb } from "./connectDb";
import pharmacyRoutes from "./routes/pharmacyRoutes";

const app = express();
app.use(express.json());

const port = 5008;

connectDb();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

app.use('/api',pharmacyRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

