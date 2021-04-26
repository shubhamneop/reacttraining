import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoodIcon from "@material-ui/icons/Mood";
import { Link } from "react-router-dom";
import Spinner from "./UI/Spinner";
import Modal from "./UI/Modal";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

function Cart(props) {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [price, setPrice] = useState(0);
  const { loading, dispatch } = props;
  useEffect(() => {
    if (props.token) {
      dispatch({
        type: "CART_DATA_INIT",
      });
    }
  }, [props.token, dispatch]);

  const onRemove = (id, price) => {
    setId(id);
    setPrice(price);
    setModal(true);
  };

  const onClose = (event) => {
    event.preventDefault();
    setId("");
    setPrice(0);
    setModal(false);
  };

  const removeCart = (event) => {
    event.preventDefault();

    dispatch({
      type: "REMOVE_CART_INIT",
      payload: { cakeid: id },
      id: id,
      price: price,
    });
    setId("");
    setPrice(0);
    setModal(false);
  };

  return (
    <div>
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
        Shopping Cart <ShoppingCartIcon style={{ fontSize: "40px" }} />
      </h1>
      <div className="row" style={{ padding: "30px" }}>
        {loading ? (
          <Spinner />
        ) : props.cartData?.length > 0 ? (
          <>
            <div className="col-sm-8 col-md-8 col-md-offset-1 container cart-design">
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
                              style={{ width: "72px", height: "72px" }}
                              alt="..."
                            />{" "}
                          </td>
                          <td className="text-center">
                            <div className="media-body">
                              <h4 className="media-heading">{cart?.name}</h4>
                            </div>
                          </td>
                          <td className="text-center">
                            <strong>${cart.price}</strong>
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() =>
                                onRemove(cart?.cakeid, cart?.price)
                              }
                              type="button"
                              title="Remove"
                              className="btn btn-outline-danger"
                            >
                              <DeleteOutlineIcon />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="col-sm-4 col-md-4 total-cart">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  paddingTop: "10px",
                }}
              >
                <p style={{ textAlign: "center" }}>
                  Total Item <br /> {props.cartData?.length}
                </p>
                <p style={{ textAlign: "center" }}>
                  Total Price <br />$ {props.cartTotal}
                </p>
              </div>
              <Link to="/checkout" className="cart-btn">
                <button className="btn btn-outline-primary">Checkout</button>
              </Link>
            </div>
          </>
        ) : (
          <div className="alert alert-danger container" role="alert">
            <h4 className="alert-heading" style={{ textAlign: "center" }}>
              CART IS EMPTY!
            </h4>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                Plaese add some cake to cart{!props?.token && ", Please login"}
              </p>

              <p className="mb-0">
                Sweet Shopping <MoodIcon style={{ color: "#08aae8" }} /> !
              </p>
            </div>
          </div>
        )}
      </div>
      <Modal show={modal} modalClosed={onClose}>
        <div className="alert container" role="alert">
          <h4 className="alert-heading" style={{ textAlign: "center" }}>
            Are You Sure ? Want To Remove Item
          </h4>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              <button className="btn btn-danger btn-lg" onClick={onClose}>
                No
              </button>
            </p>

            <p className="mb-0">
              <button onClick={removeCart} className="btn btn-success btn-lg">
                Yes
              </button>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default connect(function (state, props) {
  return {
    token: state?.user?.token,
    cartData: state?.cart,
    cartTotal: state?.total,
    loading: state?.isFetching,
  };
})(Cart);
