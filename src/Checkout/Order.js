import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../UI/Spinner";
import { PLACE_ORDER } from "../redux/actionTypes";
import { UserContext } from "../UserContext";

function Order(props) {
  const { history } = props;
  const context = useContext(UserContext);
  const { loading } = context;
  useEffect(() => {
    if (props.stage !== 4) {
      props.history.push("/checkout");
    }
    if (props.placeOrder) {
      props.history.push("/my-orders");
    } else if (props.cartData?.length === 0) {
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
  }, [
    props.stage,
    props.address?.name,
    props.cartData?.length,
    props.history,
    props.placeOrder,
  ]);

  const onOrder = (event) => {
    event.preventDefault();
    let data = props.address;
    data.price = props.cartTotal;
    data.cakes = props.cartData;
    props.dispatch({
      type: PLACE_ORDER,
      payload: data,
      history: history,
    });
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
}

export default connect(function (state, props) {
  return {
    stage: state?.stage,
    address: state?.address,
    cartData: state?.cart,
    cartTotal: state?.total,
    placeOrder: state?.placeOrder,
  };
})(withRouter(Order));
