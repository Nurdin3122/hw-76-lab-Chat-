import express from 'express';
import cors from 'cors';
import MessagesRouter from "./Routers/MessagesRouter";
import MessageFile from "./WorkWithTheFiles/MessageFile";

const app = express();
const port = 8020;

app.use(cors());
app.use(express.json());
app.use('/messages', MessagesRouter);

const run = async () => {
    await MessageFile.readMessage()
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};
run().catch(console.error);