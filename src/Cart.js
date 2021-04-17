import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoodIcon from "@material-ui/icons/Mood";

function Cart(props) {
  ///addcaketocart
  //post
  //data: - cakeid,name,image,price,weight
  ///cakecart
  //{}
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let detailsapiurl = "https://apibyashu.herokuapp.com/api/cakecart";
    axios({
      url: detailsapiurl,
      method: "post",
      data: {},
      headers: {
        authtoken: props.token,
      },
    })
      .then((response) => {
        console.log("cart data", response.data);
        setCartData(response.data.data);
        var total = 0;
        response.data.data.map(({ price }) => {
          total = total + price;
        });
        setTotalPrice(total);
      })
      .catch((error) => console.log(error));
  }, [props.token]);
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
      <div className="row" style={{ padding: "10px" }}>
        {cartData?.length > 0 ? (
          <>
            <div className="col-sm-8 col-md-8 col-md-offset-1 container">
              <table className="table table-hover">
                <tbody>
                  {cartData?.length > 0 &&
                    cartData.map((cart, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <img
                              className="media-object"
                              src={cart?.image}
                              style={{ width: "72px", height: "72px" }}
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
                          <td className="text-center">
                            <button type="button" className="btn btn-danger">
                              <span className="glyphicon glyphicon-remove"></span>{" "}
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="col-sm-4 col-md-4">
              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "space-around",
                  paddingTop: "10px",
                }}
              >
                <p style={{ textAlign: "center" }}>
                  Total Item <br /> {cartData?.length}
                </p>
                <p style={{ textAlign: "center" }}>
                  Total Price <br />$ {totalPrice}
                </p>
              </div>
              <button
                style={{ display: "flex", float: "right", margin: "100px" }}
                className="btn btn-success"
              >
                Checkout
              </button>
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
    </div>
  );
}

export default connect(function (state, props) {
  return {
    token: state?.user?.token,
  };
})(Cart);
