import express from "express";
import MessageFile from "../WorkWithTheFiles/MessageFile";
import { MessageTWithoutId } from "../WorkWithTheFiles/type";
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
    const mess =await MessageFile.addMessage(newMessage)
    res.status(200).send(mess);
});

MessagesRouter.get("/",async  (req,res) => {
    const messages = await MessageFile.getMessages()
    const lastMessages = messages.slice(0, 30);
    res.status(200).send(lastMessages);

});

export default MessagesRouter;