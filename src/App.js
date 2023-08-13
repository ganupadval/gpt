import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App text-white">
      <Router>
        <Routes>
          <Route exact path="/" Component={Login}></Route>
          <Route path="/signup" Component={SignUp}></Route>
          <Route path="/chat" Component={Chat}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
