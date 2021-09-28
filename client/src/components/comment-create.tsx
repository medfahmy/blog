import axios from "axios";
import { SyntheticEvent, useState } from "react";

const postCommentsUrl = (postId: string) => {
    return `http://localhost:4001/posts/${postId}/comments/post`;
};

export const CommentCreate = ({ postId }: { postId: string }) => {
    const [content, setContent] = useState("");

    const handleSumbit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post(postCommentsUrl(postId), { content });
        setContent("");
    };

    return (
        <div>
            <form onSubmit={handleSumbit}>
                <div className="form-group">
                    <label>new comment</label>
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">submit</button>
            </form>
        </div>
    );
};
