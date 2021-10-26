import { useState } from "react";
import moment from 'moment';

export default function CreatePost({ fetchPosts }) {
    const [fields, setFields] = useState({
        content: ''
    });
    const [fieldErrors, setFieldErrors] = useState({
        content: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (fields.content.trim() == "") {
            return setFieldErrors({ ...fieldErrors, content: 'Content cannot be empty.' });
        } else {
            setFieldErrors({ ...fieldErrors, content: '' });
        }

        try {
            const res = await fetch('http://localhost:5000/posts', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...fields,
                    author: localStorage.getItem('_username'),
                    createdAt: moment()
                })
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
            <form onSubmit={handleSubmit} method="post">
                <div className="form-floating mb-3">
                    <textarea className="form-control" id="floatingInputContent" placeholder="." onChange={e => setFields({ ...fields, content: e.target.value })} value={fields.content}></textarea>
                    <label htmlFor="floatingInputContent" className="fw-bold">Content</label>
                    <small className="text-danger">{fieldErrors.content}</small>
                </div>
                <button className="btn btn-primary mb-3 py-3 fw-bold w-100">
                    Create Post
                </button>
            </form>
        </>
    )
}