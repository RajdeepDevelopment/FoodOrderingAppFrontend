import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

function ForgotPassword() {
  return (
    <>
      <div className="bhag mt-4 ">
        <div className="p-2 card text-center " style={{ width: 300 }}>
          <div className="card-header h5 text-white bg-primary">
            Password Reset
          </div>
          <div className="card-body px-5">
            <p className="card-text py-2">
              Enter your email address and we'll send you an email with
              instructions to reset your password.
            </p>
            <div className="form-outline">
              <input
                type="email"
                id="typeEmail"
                className="form-control my-3"
              />
              <label className="form-label" htmlFor="typeEmail">
                Email input
              </label>
            </div>
            <a href="#" className="btn btn-primary w-100">
              Reset password
            </a>
            <div className="d-flex justify-content-between mt-4">
              <Link className="" to="/login">
                Login
              </Link>
              <a className="" href="#">
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
