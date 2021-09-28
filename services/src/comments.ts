import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

interface Comment {
    id: string;
    content: string;
}

const EVENTS_URL = "http://localhost:4005/events";

// TODO: save comments to db
const commentsByPostId: { [postId: string]: Comment[] } = {};
// const commentsByPostId = {};

const generateRandomId = () => {
    return randomBytes(4).toString("hex");
};

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.get("/posts/:id/comments/get", (req, res) => {
    const postId = req.params.id;
    const comments = commentsByPostId[postId] || [];

    return res.status(200).json(comments);
});

app.post("/posts/:id/comments/post", async (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;
    const id = generateRandomId();

    const comments = commentsByPostId[postId] || [];
    comments.push({ id, content });
    commentsByPostId[postId] = comments;

    await axios.post(EVENTS_URL, {
        type: "COMMENT_CREATED",
        data: { id, postId, content },
    });

    return res.status(201).json(comments);
});

app.post("/events", (req, res) => {
    console.log("received event", req.body);
    res.sendStatus(200);
});

app.listen(4001, () => {
    console.log("listening on port 4001");
});
