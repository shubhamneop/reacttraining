import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Signup from "./Signup";
import Login from "./Login";
import { useEffect } from "react";
import Search from "./Search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CakeDetails from "./CakeDetails";
import { connect } from "react-redux";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Password from "./Password";
import { ToastContainer } from "react-toastify";
import MyOrder from "./MyOrder";

function App(props) {
  useEffect(() => {
    var title = "Shubham`s";
    document.title = `${title} Cake Shop  | ${props.user?.name || "App"}`;

    if (localStorage.token && !props.user) {
      props.dispatch({ type: "INIT_USER" });
    }

    if (props.token) {
      props.dispatch({
        type: "CART_DATA_INIT",
      });
    }
  }, [props.token, props]);

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
          <Route path="/my-orders" exact component={MyOrder} />
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
