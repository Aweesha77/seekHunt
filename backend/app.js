import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

const app=express();

dotenv.config({path :'./config/config.env'});

app.use(cors({
    origin: [process.env.FRONTEND_URL]
}));

export default app;