import React, { useEffect } from "react";
import { connect } from "react-redux";

export const CartSummery = (props) => {
  const nextClick = () => {
    props.dispatch({
      type: "CHECKOUT_STAGE",
      payload: 2,
    });
    props.history.push("/checkout/address");
  };
  return (
    <div className="cart-design">
      <table className="table table-hover">
        <tbody>
          {props.cartData?.length > 0 &&
            props.cartData.map((cart, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">
                    <img
                      className="media-object"
                      src={cart?.image}
                      style={{ width: "50px", height: "50px" }}
                    />{" "}
                  </td>
                  <td className="text-center">
                    <p className="media-heading">
                      <strong>{cart?.name}</strong>
                    </p>
                  </td>
                  <td className="text-center">
                    <strong>${cart.price}</strong>
                  </td>
                </tr>
              );
            })}
          <tr key={Math.random.toString}>
            <td className="text-center">Total Amount</td>
            <td className="text-center"></td>
            <td className="text-center">
              <strong>${props.cartTotal}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      {props.stage == 1 && (
        <button onClick={nextClick} className="btn btn-success">
          Next
        </button>
      )}
    </div>
  );
};

export default connect(function (state, props) {
  return {
    cartData: state?.cart,
    cartTotal: state?.total,
    stage: state?.stage,
  };
})(CartSummery);
