import { PostCreate } from "./components/post-create";
import { PostList } from "./components/post-list";

export const App: React.FC = () => {
    return (
        <div className="container">
            <h1>create post</h1>
            <PostCreate />
            <hr />
            <h1>posts</h1>
            <PostList />
        </div>
    );
};
