import express from "express";
import { connectDb } from "./connectDb";

const app = express();
app.use(express.json());

const port = 5001;

connectDb();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


