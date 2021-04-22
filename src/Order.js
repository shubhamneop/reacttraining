import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

function Order(props) {
  useEffect(() => {
    if (props.stage !== 4) {
      props.history.push("/checkout");
    }
  }, []);
  console.log(props.history);
  const onOrder = (event) => {
    event.preventDefault();
    props.dispatch({
      type: "CHECKOUT_STAGE",
      payload: 1,
    });
    props.history.replace("/");
  };
  return (
    <>
      <div className="alert alert-info container" role="alert">
        <h4 className="alert-heading" style={{ textAlign: "center" }}>
          Please proceed further
        </h4>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="mb-0">Sweet Shopping !</p>
        </div>
      </div>
      <div>
        <button onClick={onOrder} className="btn btn-info">
          Order
        </button>
      </div>
    </>
  );
}

export default connect(function (state, props) {
  return {
    stage: state?.stage,
  };
})(withRouter(Order));
