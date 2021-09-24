import express from "express";
import { randomBytes } from "crypto";

const app = express();
app.use(express.json());

interface Post {
    id: string;
    content: string;
}

const posts: { [id: string]: Post } = {};

const generateRandomId = () => {
    return randomBytes(4).toString("hex");
};

app.get("/posts/get", (_req, res) => {
    return res.json(posts);
});

app.post("/posts/post", (req, res) => {
    console.log(req.body);

    const id = generateRandomId();
    const { content } = req.body;

    posts[id] = {
        id,
        content,
    };

    return res.status(201).json(posts[id]);
});

app.listen(4000, () => {
    console.log("server running at http://localhost:4000");
});
