import express from "express";
const betaRouter = express.Router();

betaRouter.get('/', async (req, res) => {
    res.send("Hello, world!");
});

export default betaRouter;