import express from 'express'
import generalRouter from './routes/general.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
    ],
     credentials: true
}))

app.use("/", generalRouter);


export default app;   





