import React from 'react'

export default function Chat() {
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
              <div className="container" style={{ height: "75vh" }}>
                a
              </div>
              <div
                className="container mt-2"
                style={{ height: "8vh", display: "flex" }}
              >
                <form className="d-flex ">
                  <input type="text" className="m-auto" style={{width:"70vw", height:"6vh", backgroundColor:"rgba(255, 255, 255, .50)", border:"none", borderRadius:'10px'}}></input>
                  <input type="submit"
                    className="m-auto"
                    style={{
                      height: "45px",
                      width: "60px",
                      color:"yellowgreen",
                      marginRight: "10px",
                      border:"none",
                      backgroundColor:"rgba(255, 255, 255, .20)",
                      borderRadius:"10px",
                    }}
                    value="Start"
                  >
               
                  </input>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
