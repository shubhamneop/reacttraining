import React, { useEffect } from "react";
import { Route } from "react-router";
import Address from "./Address";
import Payment from "./Payment";
import Order from "./Order";
import CartSummery from "./CartSummery";
import { Link, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

function Checkout(props) {
  let route = useRouteMatch();
  var url = route.url;
  var path = route.path;
  useEffect(() => {
    if (!props.token) {
      props.history.push("/");
    }
  }, [props.token]);
  return (
    <>
      <h1
        style={{
          margin: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          paddingBottom: "20px",
          padding: "20px",
        }}
      >
        Checkout
      </h1>
      <div className="row" style={{ padding: "20px" }}>
        <div className="col-md-4">
          <Link to={url}>
            <li>Cart Summery</li>
          </Link>

          <Link to={url + "/address"}>
            <li>Address</li>
          </Link>

          <Link to={url + "/payment"}>
            <li>Payment </li>
          </Link>

          <Link to={url + "/order"}>
            <li>Order </li>
          </Link>
        </div>
        <div className="col-md-8">
          <Route exact path={path} component={CartSummery} />
          <Route exact path={path + "/address"} component={Address} />
          <Route exact path={path + "/payment"} component={Payment} />
          <Route exact path={path + "/order"} component={Order} />
        </div>
      </div>
    </>
  );
}

export default connect(function (state, props) {
  return {
    token: state?.user?.token,
  };
})(Checkout);
