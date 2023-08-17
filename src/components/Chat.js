import React from "react";
import Bar from "../Bar";
import Code from "./Code";
import { useState, useEffect } from "react";

export default function Chat() {
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState([]);
  const[ loading, setLoading] = useState(false)

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true)
    setData([]);
    // setLoading(true);
    const url = "https://a486-34-87-170-94.ngrok-free.app/chat/";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: inputData }),
    })
      .then((res) => res.json())
      .then((data) => {setData(data);
      setLoading(false)
      console.log(data)});
  }

  

  return (
    <div>
      <div
        className="container m-2 p-2"
        style={{ minWidth: "-webkit-fill-available" }}
      >
        <h4>Title</h4>
      </div>
      <div className=" mw-100 ">
        <div className="d-flex" style={{ height: "90vh" }}>
          <div
            className=" container m-2 d-none d-md-block"
            style={{ width: "30%" }}
          >
            <div className="m-auto mt-2">
              <li className="list">Chat 1</li>

              <li className="list">Chat 2</li>
            </div>
          </div>
          <div className=" container m-2 ">
            <div className="m-auto mt-2">
              <div className="container" style={{ height: "74vh", overflow: "auto"  }}>
                {/* {data.map((a)=>{
                  <p>{a.response}</p>  
                })} */}
                <p className="response" style={{ whiteSpace: 'pre-line' }}>{data.response}</p>
              </div>
              {loading && (<Bar />)}
              
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
                    placeholder="Give prompt to the model"
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
