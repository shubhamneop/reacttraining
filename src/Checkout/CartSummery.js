import React from "react";
import { connect } from "react-redux";
import { setCheckoutStage } from "../redux/thunk/thunks";

export const CartSummery = (props) => {
  const nextClick = () => {
    props.dispatch(setCheckoutStage(2));
    props.history.push("/checkout/address");
  };
  return (
    <>
      {props.cartData?.length > 0 ? (
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
                          alt="..."
                        />{" "}
                      </td>
                      <td className="text-center">
                        <p
                          className="media-heading"
                          style={{ wordBreak: "break-all" }}
                        >
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
          {props.stage === 1 && (
            <button onClick={nextClick} className="btn btn-outline-primary">
              Next
            </button>
          )}
        </div>
      ) : (
        <div className="alert alert-danger container" role="alert">
          <h4 className="alert-heading" style={{ textAlign: "center" }}>
            CART IS EMPTY!
          </h4>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Plaese add some cake to cart</p>
          </div>
        </div>
      )}
    </>
  );
};

export default connect(function (state, props) {
  return {
    cartData: state?.other?.cart,
    cartTotal: state?.other?.total,
    stage: state?.other?.stage,
  };
})(CartSummery);
