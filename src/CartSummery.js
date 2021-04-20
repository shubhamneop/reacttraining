import React, { Component } from "react";
import { connect } from "react-redux";

export const CartSummery = (props) => {
  return (
    <div>
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
                    <div className="media-body">
                      <h4 className="media-heading">
                        <a>{cart?.name}</a>
                      </h4>
                    </div>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartData: state?.cart,
  cartTotal: state?.total,
});

const mapDispatchToProps = {};

export default connect(function (state, props) {
  return {
    cartData: state?.cart,
    cartTotal: state?.total,
  };
})(CartSummery);
