import moment from "moment";
import { useState } from "react";
import EditPost from "./EditPost";

export default function Post({ post: { id, author, content, createdAt }, handleDeletePost, fetchPosts }) {
    const [showFormEditPost, setShowFormEditPost] = useState(false);
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="px-3 pt-2 pb-3 border shadow-sm mb-1 rounded">
            <div className="mb-2 d-flex align-items-center justify-content-between">
                <div>
                    <small className="fw-bold text-dark me-2 d-inline-block">{author}</small>
                    <small className="text-muted me-2 d-inline-block">{moment(createdAt).format('h:mm A, D/MM/YYYY')}</small>
                </div>
                {author === localStorage.getItem('_username') &&
                    <div>
                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuPostButton" data-bs-toggle="dropdown" aria-expanded="false">
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuPostButton">
                                <li><button className="dropdown-item btn-sm" onClick={() => setShowFormEditPost(!showFormEditPost)}>{showFormEditPost ? 'Close edit form' : 'Show edit form'}</button></li>
                                <li><button className="dropdown-item btn-sm" onClick={() => confirm("Are you sure to delete this post?") && handleDeletePost(id)}>Delete</button></li>
                            </ul>
                        </div>
                    </div>
                }
            </div>
            {showFormEditPost ?
                <EditPost fetchPosts={fetchPosts} id={id} />
                :
                <>
                    <p className="mb-3">{showMore ? content : content.length >= 200 ? content.substr(0, 200) + '...' : content}</p>
                    {content.length >= 200 && <button className="btn btn-light btn-sm fw-bold" onClick={() => setShowMore(!showMore)}>Show {showMore ? 'less' : 'more'}</button>}
                </>
            }

        </div>
    )
}