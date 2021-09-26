import axios from "axios";
import { useEffect, useState } from "react";
import { CommentCreate } from "./comment-create";
import { CommentList } from "./comment-list";

export const POSTS_URL = "http://localhost:4000/posts";

interface Post {
    id: string;
    content: string;
}

interface Posts {
    [id: string]: Post;
}

export const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Posts>({});

    const fetchPosts = async (url: string) => {
        const res = await axios.get(url);
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts(`${POSTS_URL}/get`);
    }, []);

    const renderedPosts = Object.values(posts).map((post: Post) => {
        return (
            <div
                className="card"
                style={{ width: "30%", marginBottom: "20px" }}
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.content}</h3>
                    <CommentList postId={post.id} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="d-flex flex-row flex-wrap jusftify-content-between">
                {renderedPosts}
            </div>
            <pre>{JSON.stringify(posts, null, 2)}</pre>
        </div>
    );
};
