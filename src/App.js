import "./App.css";
import Bar from "./Bar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App text-black">
      <Router>
        <Routes>
          <Route exact path="/" Component={Login}></Route>
          <Route path="/signup" Component={SignUp}></Route>
          <Route path="/chat" Component={Chat}></Route>
        </Routes>
      </Router>
      {/* <Bar/> */}
    </div>
  );
}

export default App;
