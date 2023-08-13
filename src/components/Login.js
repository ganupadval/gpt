import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <br />
      <br />
      <br />
      <div
        className="d-flex"
        style={{ justifyContent: "center", alignContent: "center" }}
      >
        <div
          className="text-center container p-2 m-5 d-grid"
          style={{ width: "40%", height: "60vh" }}
        >
          <h4 className="mt-5">Sign In</h4>

          <form
            style={{
              display: "grid",
              justifyItems: "center",
              alignContent: "space-evenly",
              height: "25vh",
            }}
          >
            <div>
              <input
                style={{
                  minWidth: "25vw",
                  height: "6vh",
                  borderRadius: "10px",
                }}
                type="text"
                placeholder="   Username"
              ></input>
            </div>
            <div>
              <input
                style={{
                  minWidth: "25vw",
                  height: "6vh",
                  borderRadius: "10px",
                }}
                type="password"
                placeholder="   Password"
              ></input>
            </div>
            <div>
            <Link to='/chat'>
              <input
                type="submit"
                style={{ height: "5vh", borderRadius: "10px" }}
              ></input></Link>
            </div>
          </form>

          <span>
            Don't have account?<Link to="/signup"> SignUp here</Link>
          </span>
        </div>
      </div>
    </>
  );
}
