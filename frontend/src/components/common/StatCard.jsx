function StatCard({

    title,

    value,

    subtitle,

    color,

    icon

}) {

    return (

        <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

                <div className="d-flex justify-content-between">

                    <div>

                        <small className="text-muted">

                            {title}

                        </small>

                        <h2
                            className="fw-bold mt-2"
                            style={{
                                color
                            }}
                        >

                            {value}

                        </h2>

                        <small className="text-muted">

                            {subtitle}

                        </small>

                    </div>

                    <div
                        style={{
                            fontSize: "34px",
                            color
                        }}
                    >

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StatCard;