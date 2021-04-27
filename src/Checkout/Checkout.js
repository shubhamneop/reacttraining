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
  var currentpath = props.location.pathname;
  useEffect(() => {
    if (!localStorage.token) {
      props.history.push("/");
    }
  }, [props.token, props.history]);
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
          <div
            className="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <Link to={url} className="remove-line">
              <li
                className={`checkout-link nav-link ${
                  url === currentpath && "active"
                }`}
                id="v-pills-home-tab"
                data-toggle="pill"
              >
                Cart Summery
              </li>
            </Link>
            {props.stage === 1 ? (
              <li
                className="checkout-link nav-link"
                style={{ cursor: "not-allowed" }}
              >
                Address
              </li>
            ) : (
              <Link to={url + "/address"} className="remove-line">
                <li
                  className={`checkout-link nav-link ${
                    url + "/address" === currentpath && "active"
                  }`}
                  id="v-pills-profile-tab"
                  data-toggle="pill"
                >
                  Address
                </li>
              </Link>
            )}
            {props.stage === 2 || props.stage === 1 ? (
              <li
                className={`checkout-link nav-link`}
                style={{ cursor: "not-allowed" }}
              >
                Payment
              </li>
            ) : (
              <Link to={url + "/payment"} className="remove-line">
                <li
                  className={`checkout-link nav-link ${
                    url + "/payment" === currentpath && "active"
                  }`}
                  id="v-pills-messages-tab"
                  data-toggle="pill"
                >
                  Payment
                </li>
              </Link>
            )}
            {props.stage !== 4 ? (
              <li
                className={`checkout-link nav-link`}
                style={{ cursor: "not-allowed" }}
              >
                Order
              </li>
            ) : (
              <Link to={url + "/order"} className="remove-line">
                <li
                  className={`checkout-link nav-link ${
                    url + "/order" === currentpath && "active"
                  }`}
                  id="v-pills-settings-tab"
                  data-toggle="pill"
                >
                  Order
                </li>
              </Link>
            )}
          </div>
          {/* <ul className="nav flex-column nav-customs">
            <Link to={url}>
              <li className="nav-item">Cart Summery</li>
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
          </ul> */}
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
    stage: state?.stage,
  };
})(Checkout);
