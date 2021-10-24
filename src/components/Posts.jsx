import Post from "./Post"
import { useEffect, useState } from 'react';
import Spinner from "./Spinner";
import CreatePost from "./CreatePost";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);

    async function fetchPosts() {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/posts?_sort=createdAt&_order=desc');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.log("Something went wrong!!");
        }
        setLoading(false);
    }

    async function handleDeletePost(id) {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/posts/${id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            fetchPosts();
        } catch (error) {
            console.log("Something went wrong!!");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="container min-vh-100 pb-5">
            <div className="row">
                <div className="col-md-7 mx-auto">
                    <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                        <h1 className="fs-1 fw-bold">Posts</h1>
                        <button className="btn btn-sm btn-light fw-bold" onClick={() => setShowCreatePostForm(!showCreatePostForm)}>{showCreatePostForm ? 'Close' : 'Show Form'}</button>
                    </div>
                    {showCreatePostForm && <CreatePost fetchPosts={fetchPosts} />}
                    {loading ? <Spinner /> :
                        posts.map((post, i) => {
                            return <Post key={i} post={post} handleDeletePost={handleDeletePost} fetchPosts={fetchPosts} />
                        })
                    }
                    {/* if posts does not exists and after fetching to server */}
                    {(!loading && posts.length == 0) && (
                        <p className="text-center fw-bold text-danger py-4">Posts not found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}