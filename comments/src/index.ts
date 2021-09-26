import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";

interface Comment {
    id: string;
    content: string;
}

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
