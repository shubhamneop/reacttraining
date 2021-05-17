import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { setCheckoutStage } from "../redux/thunk/thunks";

function Payment(props) {
  const [checked, setCheked] = useState(true);
  useEffect(() => {
    if (props.stage === 2 || props.stage === 1) {
      props.history.push("/checkout");
    }
    if (props.cartData?.length === 0) {
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
  }, [props.stage, props.address?.name, props.cartData?.length, props.history]);
  const submit = (event) => {
    event.preventDefault();
    if (props.stage !== 4) {
      props.dispatch(setCheckoutStage(4));
    }
    props.history.push("/checkout/order");
  };
  return (
    <>
      <div className="alert alert-success container" role="alert">
        <h4 className="alert-heading" style={{ textAlign: "center" }}>
          Please proceed further with Cash on delivery
        </h4>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="mb-0">Sweet Shopping !</p>
        </div>
      </div>
      <div
        className="row"
        style={{ justifyContent: "space-between", paddingRight: "15px" }}
      >
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="cod"
            id="flexRadioDefault1"
            value="cod"
            checked={checked}
            onChange={() => setCheked(true)}
            style={{ border: "0px", width: "100%", height: "2em" }}
          />
          <span
            className="form-check-label"
            style={{ position: "relative", left: "40px", top: "6px" }}
          >
            COD
          </span>
        </div>
        <br></br>
        <div>
          <button className="btn btn-outline-primary" onClick={submit}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default connect(function (state, props) {
  return {
    stage: state?.other?.stage,
    address: state?.other?.address,
    cartData: state?.other?.cart,
  };
})(withRouter(Payment));
