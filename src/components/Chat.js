import React from "react";
import Bar from "../Bar";
import Code from "./Code";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Data from "./Login";

export default function Chat() {
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [titles, setTitles] = useState([]);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");

  const [link, setLink] = useState("");

  const nurl = localStorage.getItem("link");

  const nav = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setData([]);
    // setLoading(true);
    const url = nurl + "chat/";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ prompt: inputData }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      });
  }

  async function getData(e) {
    e.preventDefault();
    const url = nurl + "chat/";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ title: "The US Economy Rankings" }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setConversation(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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
        Authorization: `Token e3886d37bd3c8ca3c4fb2b3f8f6f9fa7235a82f9`,
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
            <div className="m-auto mt-2">
              {/* <li className="list">Chat 1</li> */}
              {titles.map((a) => (
                <li key={a.id} className="list ellipsis">
                  {a.title}
                </li>
              ))}
            </div>
          </div>
          <div className=" container m-2 ">
            <div className="m-auto mt-2">
              <div
                className="container"
                style={{ height: "74vh", overflow: "auto" }}
              >
                {/* {data.map((a)=>{
                  <p>{a.response}</p>  
                })} */}
                <p className="response" style={{ whiteSpace: "pre-line" }}>
                  {data.ai_responce}
                </p>
              </div>
              {loading && <Bar />}

              <div
                className="container mt-1"
                style={{ height: "8vh", display: "flex" }}
              >
                <form className="d-flex ">
                  <input
                    type="text"
                    className="m-auto"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
