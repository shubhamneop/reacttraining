import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Signup from "./Signup";
import Login from "./Login";
import { useState, useEffect } from "react";
import Search from "./Search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import CakeDetails from "./CakeDetails";

function App() {
  const [user, setUser] = useState({});
  const [logintatstus, setlogintatstus] = useState(false);

  useEffect(() => {
    if (localStorage.token && localStorage.email) {
      setlogintatstus(true);
    }
  }, []);

  return (
    <Router>
      <Navbar logintatstus={logintatstus} />
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/signup" exact component={Signup} />

        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Route path="/cake/:cakeid" exact component={CakeDetails} />
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
