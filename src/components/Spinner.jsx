export default function Spinner() {
    return (
        <>
            <div className="text-center p-3 my-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}