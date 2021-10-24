import { useState } from "react";
import moment from 'moment';

export default function CreatePost({ fetchPosts }) {
    const [fields, setFields] = useState({
        author: '',
        content: ''
    });
    const [fieldErrors, setFieldErrors] = useState({
        author: '',
        content: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (fields.author.trim() == "") {
            return setFieldErrors({ ...fieldErrors, author: 'Author cannot be empty.' });
        } else {
            setFieldErrors({ ...fieldErrors, author: '' });
        }

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
                    createdAt: moment()
                })
            });
            const data = await res.json();
            // re-render posts
            fetchPosts();
            setFields({ author: '', content: '' });
            setFieldErrors({ author: '', content: '' });
        } catch (error) {
            console.error("Cannot create post, please try again later!");
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} method="post">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInputAuthor" placeholder="." value={fields.author} onChange={e => setFields({ ...fields, author: e.target.value })} />
                    <label htmlFor="floatingInputAuthor" className="fw-bold">Author</label>
                    <small className="text-danger">{fieldErrors.author}</small>
                </div>
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