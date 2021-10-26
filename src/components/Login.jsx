import { useState } from "react"

export default function Login() {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (username.trim() == '') {
            setUsernameError('Username cannot be empty.');
        } else {
            setUsernameError('');
        }

        const isUsernameExists = localStorage.getItem('_username');
        if (!isUsernameExists) {
            localStorage.setItem('_username', username);
        }

        window.location.reload();
    }

    return (
        <>
            <div className="container min-vh-100 py-5">
                <div className="row">
                    <div className="col-md-6 mx-auto my-auto">
                        <h1 className="mb-2">Welcome...</h1>
                        <p className="mb-2 text-muted">Please enter your username!</p>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInputUsername" placeholder="." value={username} onChange={e => setUsername(e.target.value)} />
                                <label htmlFor="floatingInputUsername" className="fw-bold">Username</label>
                                <small className="text-danger">{usernameError}</small>
                            </div>
                            <button className="btn btn-primary mb-3 py-3 fw-bold w-100">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}