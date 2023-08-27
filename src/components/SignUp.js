import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const url= localStorage.getItem("link");
    if (password1 !== password2) {
      alert("Password doesn't match");
    } else {
      // Perform API call for authentication and get the token
      try {
        const response = await fetch(url+"register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password1 }),
        });

        if (response.ok) {
          alert("User created");
          nav("/");
        } else {
          alert("Try Another username");
        }
      } catch (error) {
        console.error("SignUp error:", error);
      }
    }
  };
  return (
    <div>
      
      <div
        className="d-flex form"
        style={{ justifyContent: "center", alignContent: "center" }}
      >
        <div
          className="text-center container p-2 m-5 d-grid"
          style={{ width: "40%", height: "60vh" }}
        >
          <h4 className="mt-5">Sign Up</h4>

          <form
            onSubmit={handleSignup}
            style={{
              display: "grid",
              justifyItems: "center",
              alignContent: "space-evenly",
              height: "25vh",
            }}
          >
            <div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
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
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
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
            Already have account? <Link to="/">SignIn</Link> here
          </span>
        </div>
      </div>
    </div>
  );
}
