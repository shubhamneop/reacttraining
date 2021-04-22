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
import Checkout from "./Checkout";
import Password from "./Password";
import { ToastContainer } from "react-toastify";

function App(props) {
  useEffect(() => {
    document.title = `Cake Shop | ${props.user?.name || "App"}`;
    var token = localStorage.token;

    if (localStorage.token && !props.user) {
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

    let detailsapiurl = "https://apibyashu.herokuapp.com/api/cakecart";
    axios({
      url: detailsapiurl,
      method: "post",
      data: {},
      headers: {
        authtoken: token,
      },
    })
      .then((response) => {
        var total = 0;
        response.data.data.map(({ price }) => {
          total = total + price;
        });
        props.dispatch({
          type: "CART_DATA",
          payload: response.data.data,
          total: total,
        });
      })
      .catch((error) => console.log(error));
  }, [props.token]);

  return (
    <>
      <ToastContainer />
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
          <Route path="/checkout" component={Checkout} />
          <Route path="/forgot-password" exact component={Password} />
          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default connect(function (state, props) {
  return {
    user: state?.user,
    token: state?.user?.token,
  };
})(App);
