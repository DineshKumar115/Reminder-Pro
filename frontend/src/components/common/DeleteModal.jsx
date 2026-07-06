function DeleteModal({

    show,
    title,
    message,
    onCancel,
    onConfirm,
    loading

}) {

    if (!show) return null;

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            🗑 {title}

                        </h5>

                    </div>

                    <div className="modal-body">

                        <p>{message}</p>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onCancel}
                            disabled={loading}
                        >

                            Cancel

                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={onConfirm}
                            disabled={loading}
                        >

                            {

                                loading ?

                                "Deleting..."

                                :

                                "Delete"

                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DeleteModal;