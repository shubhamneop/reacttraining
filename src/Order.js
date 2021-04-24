import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";

function Order(props) {
  useEffect(() => {
    if (props.stage !== 4) {
      props.history.push("/checkout");
    }
    if (props.cartData?.length == 0) {
      toast.warning("Plase add product in cart", {
        position: toast.POSITION.TOP_RIGHT,
      });
      props.history.push("/checkout");
    } else if (!props.address?.name) {
      toast.error("Please fill address !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      props.history.push("/checkout/address");
    }
  }, [props.stage]);

  const onOrder = (event) => {
    event.preventDefault();
    props.dispatch({
      type: "CHECKOUT_STAGE",
      payload: 1,
    });
    toast.success(`Order Placed !`, {
      position: toast.POSITION.TOP_RIGHT,
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
        <button onClick={onOrder} className="btn btn-outline-primary">
          Order
        </button>
      </div>
    </>
  );
}

export default connect(function (state, props) {
  return {
    stage: state?.stage,
    address: state?.address,
    cartData: state?.cart,
  };
})(withRouter(Order));
