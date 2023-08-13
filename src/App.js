import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container text-center mw-100 m-0 ">
        <h2>Title</h2>
      </div>
      <div className="container text-center mw-100 ">
        <div className="row m-auto " style={{ height: "92vh" }}>
          <div className="col-3 bg-primary d-none d-md-block">1 of 2</div>
          <div className="col-md-9 bg-secondary ">
            <div className="m-auto mt-2">
              <div className="bg-primary " style={{ height: "80vh" }}>
                a
              </div>
              <div className="bg-success mt-2" style={{ height: "8vh", display:'flex' }}>
                <div className="m-auto">b</div>
                <div className="bg-secondary mt-1" style={{height:"45px", width:"45px", marginRight:'10px'}}>c</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
