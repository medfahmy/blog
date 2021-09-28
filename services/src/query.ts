import express from "express";
import cors from "cors";

interface Post {
    id: string;
    content: string;
    comments: Comment[];
}

interface Comment {
    id: string;
    content: string;
}

interface Posts {
    [id: string]: Post;
}

const posts: Posts = {};

const app = express();
app.use(express.json());
app.use(cors());

app.get("/posts", (_req, res) => {
    res.status(200).json(posts);
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;

    if (type === "POST_CREATED") {
        const { id, content } = data;
        posts[id] = { id, content, comments: [] };
    }

    if (type === "COMMENT_CREATED") {
        const { id, content, postId } = data;
        const post = posts[postId];
        if (post) {
            post.comments.push({ id, content });
        }
    }

    console.log(posts);
    res.sendStatus(200);
});

app.listen(4002, () => {
    console.log("listening on port 4002");
});
