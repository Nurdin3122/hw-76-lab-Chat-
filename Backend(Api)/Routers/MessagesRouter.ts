import express from "express";
import MessageFile from "../WorkWithTheFiles/MessageFile";
import {MessageT, MessageTWithoutId} from "../WorkWithTheFiles/type";
const MessagesRouter = express.Router();
MessagesRouter.post("/",async  (req,res) => {
    const { author, message } = req.body;
    if (!author || !message) {
        return res.status(400).send({ error: 'Author and message must be present in the request' });
    }
    const newMessage:MessageTWithoutId = {
        author,
        message,
        time: new Date().toISOString(),
    };
    const mess = await MessageFile.addMessage(newMessage) || [];
        res.status(200).send(mess) ;
});

MessagesRouter.get("/",async  (req,res) => {
    const queryDate = req.query.time as string;
    const messages = await MessageFile.getMessages();
    let filteredMessages: MessageT[];

    if (queryDate) {
        const date = new Date(queryDate);
        if (isNaN(date.getTime())) {
            return res.status(400).send({ error: "Invalid date format" });
        }
        filteredMessages = messages.filter((message: MessageT) => new Date(message.time) > date);
    } else {
        filteredMessages = messages;
    }

    filteredMessages.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    const lastMessages = filteredMessages.slice(0, 30);
    return res.status(200).send(lastMessages);
});

export default MessagesRouter;