import express from "express";
import { randomBytes } from "crypto";

const app = express();
app.use(express.json());

interface Comment {
    id: string;
    content: string;
}

const commentsByPostId: { [postId: string]: Comment[] } = {};
// const commentsByPostId = {};

const generateRandomId = () => {
    return randomBytes(4).toString("hex");
};

app.get("/posts/:id/comments/get", (req, res) => {
    const postId = req.params.id;
    const comments = commentsByPostId[postId] || [];

    return res.status(200).json(comments);
});

app.post("/posts/:id/comments/post", (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;

    const comments = commentsByPostId[postId] || [];

    const _comment = {
        id: generateRandomId(),
        content,
    };
    comments.push(_comment);

    commentsByPostId[postId] = comments;

    return res.status(201).json(comments);
});

app.listen(4001, () => {
    console.log("server running at http://localhost:4000");
});
