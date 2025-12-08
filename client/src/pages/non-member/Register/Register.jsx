import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
  return (
    <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-center">
      
      <div
        className="card p-4"
        style={{ width: "400px", border: "2px solid #000" }}
      >
        <h4 className="text-center fw-bold mb-3">REGISTRATION</h4>
        <hr />

        <form>
          <div className="mb-3 row align-items-center">
            <label className="col-4 col-form-label">Name</label>
            <div className="col-8">
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="mb-3 row align-items-center">
            <label className="col-4 col-form-label">Email</label>
            <div className="col-8">
              <input type="email" className="form-control" />
            </div>
          </div>

          <div className="mb-3 row align-items-center">
            <label className="col-4 col-form-label">Phone</label>
            <div className="col-8">
              <input type="tel" className="form-control" />
            </div>
          </div>

          <div className="mb-3 row align-items-center">
            <label className="col-4 col-form-label">Address</label>
            <div className="col-8">
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="mb-3 row align-items-center">
            <label className="col-4 col-form-label">DOB</label>
            <div className="col-8">
              <input type="date" className="form-control" />
            </div>
          </div>

          <div className="mb-3 row align-items-center">
            <label className="col-4 col-form-label">Username</label>
            <div className="col-8">
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="mb-4 row align-items-center">
            <label className="col-4 col-form-label">Password</label>
            <div className="col-8">
              <input type="password" className="form-control" />
            </div>
          </div>

          <div className="text-center">
            <button onClick={() => navigate('/login')} type="submit" className="btn btn-outline-dark px-4">
              Register
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Register;
