import '../MyAccount/MyAccount.css'

function MyAccount () {
    return (
        <div className='m-5'>
            <div className="container py-4">

                <div className="myaccount-title text-center mb-5">
                    <h1 className="font-montserrat display-4">My Account</h1>
                    <p className="lead">Manage your membership and borrowing activity.</p>
                </div>

                <div className="content-card" style={{ margin: "auto" }}>

                    <ul className="nav nav-tabs nav-fill mb-4 custom-tabs">

                        <li className="nav-item">
                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#borrowed">
                            Currently Borrowed
                            </button>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#history">
                            Borrowing History
                            </button>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#settings">
                            Profile Settings
                            </button>
                        </li>

                    </ul>

                    <div className="tab-content">

                        <div className="tab-pane fade show active" id="borrowed">
                            <ul className="list-group list-group-flush">

                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <div>
                                    <h5 className="mb-1">The Midnight Library</h5>
                                    <p className="mb-1 text-secondary">Borrowed on: 15 Sep 2025</p>
                                    <p className="mb-0"><strong>Due on: 22 Sep 2025</strong></p>
                                    </div>
                                    <button className="btn btn-outline btn-success" >Renew</button>
                                </li>

                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <div>
                                    <h5 className="mb-1">Atomic Habits</h5>
                                    <p className="mb-1 text-secondary">Borrowed on: 10 Sep 2025</p>
                                    <p className="mb-0 overdue" style={{color: 'goldenrod'}}>
                                        <i className="bi bi-exclamation-triangle-fill me-1"></i>
                                        Due on: 17 Sep 2025 (4 days overdue)
                                    </p>
                                    </div>
                                    <span className="text-secondary">Cannot Renew</span>
                                </li>

                            </ul>
                        </div>

                        <div className="tab-pane fade" id="history">

                            <ul className="list-group list-group-flush">

                                <li className="list-group-item p-3">
                                    <h5 className="mb-1">Project Hail Mary</h5>
                                    <p className="mb-0 text-secondary">Returned on: 05 Sep 2025</p>
                                </li>

                                <li className="list-group-item p-3">
                                    <h5 className="mb-1">Dune</h5>
                                    <p className="mb-0 text-secondary">Returned on: 28 Aug 2025</p>
                                </li>

                            </ul>
                        </div>

                        <div className="tab-pane fade p-3" id="settings">
                            <form>

                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control form-control-lg" value="Current User" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input type="email" className="form-control form-control-lg" value="user@example.com" />
                                </div>

                                <hr className="my-4" />

                                <h5 className="mb-3">Change Password</h5>

                                <div className="mb-3">
                                    <label className="form-label">Current Password</label>
                                    <input type="password" className="form-control form-control-lg" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <input type="password" className="form-control form-control-lg" />
                                </div>

                                <button className="btn btn-outline btn-success ">Save Changes</button>

                            </form>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default MyAccount