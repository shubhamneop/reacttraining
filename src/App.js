import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Signup from "./Forms/Signup";
import Login from "./Forms/Login";
import React, { useEffect, Suspense } from "react";
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
import Checkout from "./Checkout/Checkout";
import { ToastContainer } from "react-toastify";
import MyOrder from "./MyOrder";
import { cartDataInit, getAllCakeInit } from "./redux/thunk/thunks";
import { InitUser } from "./redux/thunk/authThunks";
import ErrorBoundary from "./ErrorBoundary";
import UserProvider from "./UserContext";
import Spinner from "./UI/Spinner";
import Transitions from "./Transitions";

const SuspenceAdmin = React.lazy(() => import("./Admin"));
const Password = React.lazy(() => import("./Forms/Password"));

function App(props) {
  useEffect(() => {
    var title = "Shubham`s";
    document.title = `${title} Cake Shop  | ${props.user?.name || "App"}`;
    props.dispatch(getAllCakeInit());
    if (localStorage.token && !props.user) {
      props.dispatch(InitUser());
    }

    if (props.token) {
      props.dispatch(cartDataInit());
    }
  }, [props.token, props]);

  return (
    <>
      <ToastContainer />
      <ErrorBoundary>
        <UserProvider>
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
              <Route path="/forgot-password" exact>
                <Suspense fallback={<Spinner />}>
                  <Password />
                </Suspense>
              </Route>
              <Route path="/my-orders" exact component={MyOrder} />
              <Route path="/test" exact component={Transitions} />
              <Route path="/admin" exact>
                <Suspense fallback={<Spinner />}>
                  <SuspenceAdmin />
                </Suspense>
              </Route>
              <Route path="/*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Router>
        </UserProvider>
      </ErrorBoundary>
    </>
  );
}

export default connect(function (state, props) {
  return {
    user: state?.auth?.user,
    token: state?.auth?.user?.token,
  };
})(App);
