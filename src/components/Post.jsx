import moment from "moment";
import { useState } from "react";
import EditPost from "./EditPost";

export default function Post({ post: { id, author, content, createdAt }, handleDeletePost, fetchPosts }) {
    const [showFormEditPost, setShowFormEditPost] = useState(false);

    return (
        <div className="p-3 border shadow-sm mb-1 rounded">
            <div className="mb-2 d-flex align-items-center justify-content-between">
                <div>
                    <small className="fw-bold text-dark me-2 d-inline-block">{author}</small>
                    <small className="text-muted me-2 d-inline-block">{moment(createdAt).format('h:mm A, D/MM/YYYY')}</small>
                </div>
                <div>
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuPostButton" data-bs-toggle="dropdown" aria-expanded="false">
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuPostButton">
                            <li><button className="dropdown-item btn-sm" onClick={() => setShowFormEditPost(!showFormEditPost)}>{showFormEditPost ? 'close form edit' : 'show form edit'}</button></li>
                            <li><button className="dropdown-item btn-sm" onClick={() => confirm("Are you sure to delete this post?") && handleDeletePost(id)}>delete</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            {showFormEditPost ?
                <EditPost fetchPosts={fetchPosts} id={id} />
                : <p className="m-0">{content}</p>}

        </div>
    )
}