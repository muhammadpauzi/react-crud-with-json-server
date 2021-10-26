import React from 'react';

export default function Navbar({ username }) {
    return (
        <nav className="navbar navbar-expand-sm navbar-light py-4">
            <div className="container">
                <a className="navbar-brand fw-bold" href="/">React CRUD</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link fw-medium" href="#">Home</a>
                        <a className="nav-link fw-medium" href="#">Settings</a>
                        <a className="nav-link fw-medium" href="#">{username}</a>
                    </div>
                </div>
            </div>
        </nav>

    )
}