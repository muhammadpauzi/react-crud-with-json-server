import { useEffect, useState } from "react";
import moment from 'moment';
import Spinner from "./Spinner";

export default function EditPost({ fetchPosts, id }) {
    const [fields, setFields] = useState({
        author: '',
        content: '',
        createdAt: ''
    });
    const [fieldErrors, setFieldErrors] = useState({
        content: ''
    });
    const [loading, setLoading] = useState(false);
    let mounted = true;

    async function fetchPostById(idPost) {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/posts/${idPost}`);
            const data = await res.json();
            setFields({
                author: data.author,
                content: data.content,
                createdAt: data.createdAt,
            })
        } catch (error) {
            console.log("Something went wrong!!");
        }

        if (mounted) {
            setLoading(false);
        }
    }

    useEffect(() => {
        mounted = true;
        // the id is from the parent component (Post.jsx)
        fetchPostById(id);

        return () => {
            mounted = false;
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (fields.content.trim() == "") {
            return setFieldErrors({ ...fieldErrors, content: 'Content cannot be empty.' });
        } else {
            setFieldErrors({ ...fieldErrors, content: '' });
        }

        try {
            const res = await fetch(`http://localhost:5000/posts/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields)
            });
            const data = await res.json();
            // re-render posts
            fetchPosts();
            setFields({ content: '' });
            setFieldErrors({ content: '' });
        } catch (error) {
            console.error("Cannot create post, please try again later!");
        }
    }
    return (
        <>
            {loading ? <Spinner /> : <form onSubmit={handleSubmit} method="post">
                <div className="form-floating mb-3">
                    <textarea className="form-control" id="floatingInputContent" placeholder="." onChange={e => setFields({ ...fields, content: e.target.value })} value={fields.content}></textarea>
                    <label htmlFor="floatingInputContent" className="fw-bold">Content</label>
                    <small className="text-danger">{fieldErrors.content}</small>
                </div>
                <button className="btn btn-primary mb-3 py-3 fw-bold w-100">
                    Edit Post
                </button>
            </form>
            }
        </>
    )
}