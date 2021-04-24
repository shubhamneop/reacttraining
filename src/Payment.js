import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { toast } from "react-toastify";

function Payment(props) {
  useEffect(() => {
    if (props.stage === 2 || props.stage === 1) {
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
  const submit = (event) => {
    event.preventDefault();
    if (props.stage !== 4) {
      props.dispatch({
        type: "CHECKOUT_STAGE",
        payload: 4,
      });
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
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="cod"
            id="flexRadioDefault1"
            value="cod"
            checked
            style={{ border: "0px", width: "100%", height: "2em" }}
          />
          <label
            class="form-check-label"
            for="exampleRadios1"
            style={{ position: "relative", left: "40px", top: "6px" }}
          >
            COD
          </label>
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
    stage: state?.stage,
    address: state?.address,
    cartData: state?.cart,
  };
})(withRouter(Payment));
