import React, { useState } from "react";
import { CartSummery } from "./CartSummery";
import { connect } from "react-redux";

function Address(props) {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [errorMessage, seterrorMessage] = useState();
  const submit = (event) => {
    event.preventDefault();
    console.log(address);
    if (!address.name) {
      seterrorMessage("Plaese fill name");
    } else if (!address.phone) {
      seterrorMessage("Plaese fill phone");
    } else if (!address.address) {
      seterrorMessage("Plaese fill address");
    } else if (!address.city) {
      seterrorMessage("Plaese fill city name");
    } else if (!address.pincode) {
      seterrorMessage("Plaese fill pincode");
    } else {
      seterrorMessage("");
      props.dispatch({ type: "ADD_ADDRESS", payload: address });
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-7">
          <div style={{ margin: "auto" }}>
            <span style={{ color: "red" }}> </span>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={(event) =>
                  setAddress({ ...address, name: event.target.value })
                }
              />
              <span style={{ color: "red" }}> </span>
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone No"
                className="form-control"
                onChange={(event) =>
                  setAddress({ ...address, phone: event.target.value })
                }
              />
              <span style={{ color: "red" }}> </span>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Address"
                className="form-control"
                onChange={(event) =>
                  setAddress({ ...address, address: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>city</label>
              <input
                type="text"
                placeholder="City"
                className="form-control"
                onChange={(event) =>
                  setAddress({ ...address, city: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                placeholder="Pincode"
                className="form-control"
                onChange={(event) =>
                  setAddress({ ...address, pincode: event.target.value })
                }
              />
            </div>
            <span style={{ color: "red" }}>{errorMessage}</span>
            <br></br>

            <button className="btn btn-primary" onClick={submit}>
              Continue to Checkout
            </button>
          </div>
        </div>
        <div className="col-md-5">
          <CartSummery cartData={props.cartData} cartTotal={props.cartTotal} />
        </div>
      </div>
    </>
  );
}

export default connect(function (state, props) {
  console.log(state);
  return {
    cartData: state?.cart,
    cartTotal: state?.total,
  };
})(Address);
