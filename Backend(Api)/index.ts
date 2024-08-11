import express from 'express';
import cors from 'cors';
import betaRouter from "./Routers/betaRouter";

const app = express();
const port = 8020;

app.use(cors());
app.use(express.json());
app.use('/beta', betaRouter);

const run = async () => {
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};
run().catch(console.error);