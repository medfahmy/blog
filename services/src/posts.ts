import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

interface Post {
    id: string;
    content: string;
}

// TODO: save posts to db
const posts: { [id: string]: Post } = {};

const generateRandomId = () => {
    return randomBytes(4).toString("hex");
};

const EVENTS_URL = "http://localhost:4005/events";

const app = express();

//middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/posts/get", (_req, res) => {
    return res.json(posts);
});

app.post("/posts/post", async (req, res) => {
    console.log(req.body);

    const id = generateRandomId();
    const { content } = req.body;

    posts[id] = { id, content };

    await axios.post(EVENTS_URL, {
        type: "POST_CREATED",
        data: { id, content },
    });

    return res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
    console.log("received event", req.body);
    res.sendStatus(200);
});

app.listen(4000, () => {
    console.log("listening on port 4000");
});
