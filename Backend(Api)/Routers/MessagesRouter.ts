import express from "express";
import MessageFile from "../WorkWithTheFiles/MessageFile";
import {MessageTWithoutId} from "../WorkWithTheFiles/type";
const MessagesRouter = express.Router();


MessagesRouter.get('/', async (req, res) => {
    res.send("Hello, world!!!");
});

MessagesRouter.post("/",async  (req,res) => {
    const { author, message } = req.body;
    if (!author || !message) {
        return res.status(400).json({ error: 'Author and message must be present in the request' });
    }
    const newMessage:MessageTWithoutId = {
        author,
        message,
        time: new Date().toISOString(),
    };
    const mess =await MessageFile.addMessage(newMessage)
    res.status(200).send(mess);

});

export default MessagesRouter;