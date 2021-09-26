import axios from "axios";
import { useEffect, useState } from "react";

interface Comment {
    id: string;
    content: string;
}

interface CommentListProps {
    postId: string;
}

const getCommentsUrl = (postId: string) => {
    return `http://localhost:4001/posts/${postId}/comments/get`;
};

export const CommentList: React.FC<CommentListProps> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>();

    const fetchComments = async () => {
        const res = await axios.get(getCommentsUrl(postId));
        setComments(res.data);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const renderedComments = comments
        ? comments.map((comment: Comment) => {
              return <li key={comment.id}>{comment.content} </li>;
          })
        : null;

    return <ul>{renderedComments}</ul>;
};
