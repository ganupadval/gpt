import React from "react";
import Bar from "../Bar";
import Code from "./Code";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Data from "./Login";

export default function Chat() {
  const [inputData, setInputData] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [titles, setTitles] = useState([]);
  const [state, setState] = useState(false);
  const [title, setTitle] = useState("");
  const [newChat, setNewChat] = useState(true);
  // const [selectedTitle, setSelectedTitle] = useState("");
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");
  const nurl = localStorage.getItem("link");

  const nav = useNavigate();

  

  function format(data) {
    const res= data[0].ai_response;
    const codeRegex = /```([\s\S]*?)```/g;
    const formattedResponse = res.replace(
      codeRegex,
      (_, code) => `<pre>${code}</pre>`
    );
    return data[0].ai_response=formattedResponse
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(false);
    setLoading(true);
    // setLoading(true);
    const url = nurl + "chat/";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        "ngrok-skip-browser-warning": "any",
      },
      body: JSON.stringify({ prompt: inputData, title: title }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        titleTransfer(event, data.title);
        console.log(data);
      });
  }

  const titleTransfer = (e, title) => {
    e.preventDefault();
    console.log(title);
    setTitle(title);
    const url = nurl + "chat/get-data/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        "ngrok-skip-browser-warning": "any",
      },
      body: JSON.stringify({ title: title }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        format(data)
        setConversation(data);
        
      });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    setLoading(true);
    const url = nurl + "chat/";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        "ngrok-skip-browser-warning": "any",
      },
      body: JSON.stringify({ prompt: inputData }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        titleTransfer(e, data.title);
        setNewChat(false);
        setState(!state);
      });
  };

  const Logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    nav("/");
  };

  const deleteConversation = (e, title) => {
    e.preventDefault();
    const url = nurl + "chat/delete/";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        "ngrok-skip-browser-warning": "any",
      },
      body: JSON.stringify({ title: title }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewChat(true);
        setConversation([])
        setState(!state);
        alert(data)
      });
  };

  useEffect(() => {
    const url = nurl + "chat/get-titles";
    // Fetch the titles from an API endpoint
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        "ngrok-skip-browser-warning": "any",
      },
      // body: JSON.stringify({ sentence: inputData }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the titles state with the fetched data
        setTitles(data.reverse());
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching titles:", error);
      });
  }, [state]);

  return (
    <div>
      <div
        className="container m-2 p-2 d-flex"
        style={{ minWidth: "-webkit-fill-available" }}
      >
        <h4 style={{ marginLeft: "2%" }} >
          {user}
        </h4>
        <h4 style={{ margin: "auto" }}>UrGPT</h4>
        <h4 style={{ marginRight: "2%" }} onClick={Logout}>
          Logout
        </h4>
      </div>
      <div className=" mw-100 ">
        <div className="d-flex" style={{ height: "90vh" }}>
          <div
            className=" container m-2 d-none d-md-block"
            style={{ width: "18%" }}
          >
              <li
                className="list text-center d-flex"
                onClick={() => {
                  setConversation([]);
                  setNewChat(true);
                  setTitle("")
                }}
                style={{ marginBottom: "20px" }}
              >
               <div className="m-auto"> New Chat</div>
               
              </li>
            <div className="m-auto mt-2 h-75" style={{ overflow: "auto" }}>

              {titles.map((a, index) => (
                <>
               <div className="selected">
                <li
                  key={a.id}
                  className={`list  d-flex ${title === a.title ? "selected-title" : ""}`}
                  onClick={(e) => titleTransfer(e, a.title)}
                >
                  
                <div className="w-90 ellipsis">{a.title}{" "}</div>
                <div className="delete" onClick={(e)=>(deleteConversation(e,a.title))}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="22"
                  height="22"
                  viewBox="0,0,256,256 "
                >
                  <g
                    fill="#ffffff"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                    style={{mixBlendMode: "normal"}}
                  >
                    <g transform="scale(10.66667,10.66667)">
                      <path d="M10.80664,2c-0.517,0 -1.01095,0.20431 -1.37695,0.57031l-0.42969,0.42969h-5c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h16c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5l-0.42969,-0.42969c-0.365,-0.366 -0.85995,-0.57031 -1.37695,-0.57031zM4.36523,7l1.52734,13.26367c0.132,0.99 0.98442,1.73633 1.98242,1.73633h8.24805c0.998,0 1.85138,-0.74514 1.98438,-1.74414l1.52734,-13.25586z"></path>
                    </g>
                  </g>
                </svg>
                </div>
                </li>
                </div>
                
                
                </>
              ))}
            </div>
          </div>
          <div className=" container m-2 " style={{width:"80%"}}>
            <div className="m-auto mt-2">
              <div
                className="scroll-container m-2"
                style={{ height: "74vh", overflow: "auto" }}
              >
                {/* {data.map((a)=>{
                  <p>{a.response}</p>  
                })} */}
                {/* <p className="response" style={{ whiteSpace: "pre-line" }}>
                  {data.ai_responce}
                </p> */}
                {conversation.map((a) => (
                  <>
                    <h3
                      className="p3"
                      key={a.id}
                      style={{ alignItems: "center", textAlign: "center" }}
                    >
                      {a.user_response}
                    </h3>
                    <p
                      className="response container p-4"
                      style={{ whiteSpace: "pre-line" }}
                      dangerouslySetInnerHTML={{ __html: a.ai_response }}
                    >
                      {/* {a.ai_response} */}
                    </p>
                  </>
                ))}
              </div>
              {loading && <Bar />}

              <div
                className="container mt-1"
                style={{ height: "8vh", display: "flex" }}
              >
                <form className="d-flex w-100 ">
                  <input
                    type="text"
                    className="m-auto p-2"
                    value={inputData}
                    onChange={(event) => {
                      setInputData(event.target.value);
                    }}
                    style={{
                      width: "75vw",
                      height: "6vh",
                      backgroundColor: "rgba(255, 255, 255, .50)",
                      border: "none",
                      borderRadius: "10px",
                    }}
                    placeholder="   Give prompt to the model"
                  ></input>
                  {newChat ? (
                    <>
                      <input
                        type="submit"
                        className="m-auto"
                        style={{
                          height: "45px",
                          width: "60px",
                          color: "black",
                          marginRight: "10px",
                          border: "none",
                          backgroundColor: "rgba(255, 255, 255, .20)",
                          borderRadius: "10px",
                        }}
                        value="Start"
                        onClick={handleSubmit2}
                      ></input>
                    </>
                  ) : (
                    <>
                      <input
                        type="submit"
                        className="m-auto"
                        style={{
                          height: "45px",
                          width: "60px",
                          color: "black",
                          marginRight: "10px",
                          border: "none",
                          backgroundColor: "rgba(255, 255, 255, .20)",
                          borderRadius: "10px",
                        }}
                        value="Start"
                        onClick={handleSubmit}
                      ></input>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
