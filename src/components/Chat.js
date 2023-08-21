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
  const [title, setTitle] = useState("");
  const [newChat, setNewChat] = useState(true);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");
  const nurl = localStorage.getItem("link");

  const nav = useNavigate();

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
      });
  };

  const Logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    nav("/");
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
        setTitles(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching titles:", error);
      });
  }, []);

  return (
    <div>
      <div
        className="container m-2 p-2 d-flex"
        style={{ minWidth: "-webkit-fill-available" }}
      >
        <h4 style={{ margin: "auto" }}>UrGPT</h4>
        <h4 style={{ marginRight: "2%" }} onClick={Logout}>
          {user}
        </h4>
      </div>
      <div className=" mw-100 ">
        <div className="d-flex" style={{ height: "90vh" }}>
          <div
            className=" container m-2 d-none d-md-block"
            style={{ width: "20%" }}
          >
            <div className="m-auto mt-2" style={{ overflow: "auto" }}>
              <li
                className="list text-center"
                onClick={() => {
                  setConversation([]);
                  setNewChat(true)
                }}
                style={{ marginBottom: "20px" }}
              >
                New Chat
              </li>

              {titles.map((a) => (
                <li
                  key={a.id}
                  className="list ellipsis"
                  onClick={(e) => titleTransfer(e, a.title)}
                >
                  {a.title}{" "}
                </li>
              ))}
            </div>
          </div>
          <div className=" container m-2 ">
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
                    >
                      {a.ai_response}
                    </p>
                  </>
                ))}
              </div>
              {loading && <Bar />}

              <div
                className="container mt-1"
                style={{ height: "8vh", display: "flex" }}
              >
                <form className="d-flex ">
                <input
                    type="text"
                    className="m-auto p-2"
                    value={inputData}
                    onChange={(event) => {
                      setInputData(event.target.value);
                    }}
                    style={{
                      width: "70vw",
                      height: "6vh",
                      backgroundColor: "rgba(255, 255, 255, .50)",
                      border: "none",
                      borderRadius: "10px",
                    }}
                    placeholder="   Give prompt to the model"
                  ></input>
                  {newChat ? <>
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
                  ></input></>:<>
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
                  ></input></>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
