import React, { useState, useEffect, useContext ,createContext }  from "react";
import { Link, useNavigate } from "react-router-dom";

// const Data = createContext();


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warn, setWarn] = useState("");
  
  
  useEffect(()=>{
    
    setTimeout(()=>{
     if (!localStorage.getItem("link")) {
      localStorage.clear();
      var link = window.prompt("Enter API End Point");
      localStorage.setItem('link', link);
    }
    },1000)
    
    
  }, [])

  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const url =localStorage.getItem("link")

    // Perform API call for authentication and get the token
    try {
      const response = await fetch(url+"get-auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        const data = await response.json();

        // Store the token (example using local storage)
        console.log(data)
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        // Redirect to chat page
        // history.push("/chat");
        nav("/chat");

      } else {
        console.error("Login failed");
        setWarn("Login Fail");
      }

    } catch (error) {
      console.error("Login error:", error);
      setWarn("Login error:", error);
    }
  };

  // const username
  return (
    <>
      {/* <br />
      <br />
      <br /> */}
      <div
        className="d-flex align-self-center form justify-content-center"
        style={{ justifyContent: "center", alignContent: "center" }}
      >
        <div
          className="text-center container p-2 m-5 d-grid"
          style={{ width: "40%", height: "60vh" }}
        >
          <h4 className="mt-5">Sign In</h4>

          <form
            onSubmit={handleLogin}
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e)=>(setPassword(e.target.value))}
                type="password"
                placeholder="   Password"
              ></input>
            </div>
            <div>
              
                <input
                  type="submit"
                  style={{ height: "5vh", borderRadius: "10px" }}
                 ></input>
             
            </div>
          </form>
          {/* <br/> */}
            <p style={{color : "red"}}>{warn}</p>

          <span>
            Don't have account?<Link to="/signup"> SignUp here</Link>
          </span>
        </div>
      </div>
    </>
  );
}
