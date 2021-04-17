import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Signup from "./Signup";
import Login from "./Login";
import { useState, useEffect } from "react";
import Search from "./Search";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import CakeDetails from "./CakeDetails";
import { connect } from "react-redux";
import Cart from "./Cart";

function App(props) {
  useEffect(() => {
    document.title = `Cake Shop | ${props.user?.name || "App"}`;

    if (localStorage.token && !props.user) {
      var token = localStorage.token;
      let getuserapi = "https://apibyashu.herokuapp.com/api/getuserdetails";
      axios({
        url: getuserapi,
        method: "get",
        headers: {
          authtoken: token,
        },
      })
        .then((response) => {
          console.log("get user response", response.data);
          props.dispatch({ type: "INIT_USER", payload: response.data.data });
        })
        .catch((error) => console.log(error));
    }
  }, [props.user]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/signup" exact component={Signup} />

        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Route path="/cake/:cakeid" exact component={CakeDetails} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default connect(function (state, props) {
  return {
    user: state?.user,
  };
})(App);
