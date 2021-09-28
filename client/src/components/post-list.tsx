import axios from 'axios';
import { useEffect, useState } from 'react';
import { CommentCreate } from './comment-create';
import { CommentList } from './comment-list';
import { Comment } from './comment-list';

export const QUERY_URL = 'http://localhost:4002/posts';

interface Post {
    id: string;
    content: string;
    comments: Comment[];
}

interface Posts {
    [id: string]: Post;
}

export const PostList = () => {
    const [posts, setPosts] = useState<Posts>({});

    const fetchPosts = async (url: string) => {
        const res = await axios.get(url);
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts(QUERY_URL);
    }, []);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
                <div className="card-body">
                    <h3>{post.content}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="d-flex flex-row flex-wrap jusftify-content-between">{renderedPosts}</div>
            <pre>{JSON.stringify(posts, null, 2)}</pre>
        </div>
    );
};
