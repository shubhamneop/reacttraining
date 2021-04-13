import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  const [logintatstus, setlogintatstus] = useState(false);
  function LoginDone(data) {
    setUser(data);
    setlogintatstus(true);
    alert("In app nlogin");
  }
  return (
    <div className="App">
      <Navbar logintatstus={logintatstus} user={user} />
      <Home />
      <Login informlogin={LoginDone} />
      <Signup />
    </div>
  );
}

export default App;
