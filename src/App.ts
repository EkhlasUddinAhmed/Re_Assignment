import express, { Application, Request, Response } from "express";

const app:Application = express();
import cors from "cors"; 

app.use(express.json());
app.use(cors());


app.get("/",(req:Request,res:Response)=>{
    res.status(200).send("Heloo Belal")
})


export default app;