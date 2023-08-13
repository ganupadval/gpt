import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div>
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
          <h4 className="mt-5">Sign Up</h4>

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
                placeholder="   Set Password"
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
                placeholder="   Confirm Password "
              ></input>
            </div>
            <div>
              <input
                type="submit"
                style={{ height: "5vh", borderRadius: "10px" }}
              ></input>
            </div>
          </form>
          <span>
            Already have account? <Link to="/">SignIn here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
