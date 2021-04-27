import React, { useState, useEffect } from "react";
import { CartSummery } from "./CartSummery";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { setCheckoutStage, addAddress } from "../redux/thunk/thunks";

function Address(props) {
  let [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  useEffect(() => {
    if (props.stage === 1) {
      props.history.push("/checkout");
    }
    if (props.cartData?.length === 0) {
      toast.warning("Plase add product in cart", {
        position: toast.POSITION.TOP_RIGHT,
      });
      props.history.push("/checkout");
    }
    if (props.address?.name) {
      setAddress(props.address);
    }
  }, [props.stage, props.address, props.cartData?.length, props.history]);
  const [errorMessage, seterrorMessage] = useState({});
  const validate = (elements) => {
    var errors = {};
    const pattern = /^[0-9]+$/;

    if (!elements.name.value) {
      errors.name = "Plaese fill name";
    }
    if (!elements.phone.value) {
      errors.phone = "Plaese fill phone";
    } else if (!pattern.test(elements.phone.value)) {
      errors.phone = "Characters not allowed";
    } else if (elements.phone.value.length !== 10) {
      errors.phone = "Plaese enter 10 digit phone no";
    }
    if (!elements.address.value) {
      errors.address = "Plaese fill address";
    } else if (elements.address.value.length < 5) {
      errors.address = "Plaese enter address more tha 6 char";
    }
    if (!elements.city.value) {
      errors.city = "Plaese fill city name";
    }
    if (!elements.pincode.value) {
      errors.pincode = "Plaese fill pincode";
    } else if (!pattern.test(elements.pincode.value)) {
      errors.pincode = "Characters not allowed";
    } else if (elements.pincode.value.length !== 6) {
      errors.pincode = "Plaese enter 6 digit pincode";
    }
    var errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      return errors;
    } else {
      return false;
    }
  };
  const submit = (event) => {
    event.preventDefault();
    var form = document.getElementById("addressform");
    var errors = validate(form.elements);

    if (errors) {
      seterrorMessage(errors);
    } else {
      seterrorMessage({});
      props.dispatch(addAddress(address));
      if (props.stage !== 4) {
        props.dispatch(setCheckoutStage(3));
      }
      props.history.push("/checkout/payment");
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-7">
          <form
            id="addressform"
            className="custom-form"
            style={{ margin: "auto", width: "100%" }}
          >
            <span style={{ color: "red" }}> </span>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={address?.name}
                onChange={(event) =>
                  setAddress({ ...address, name: event.target.value })
                }
              />
              <span style={{ color: "red" }}>
                {errorMessage?.name && errorMessage?.name}{" "}
              </span>
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone No"
                className="form-control"
                name="phone"
                value={address?.phone}
                onChange={(event) =>
                  setAddress({ ...address, phone: event.target.value })
                }
              />
              <span style={{ color: "red" }}>
                {errorMessage?.phone && errorMessage?.phone}{" "}
              </span>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Address"
                className="form-control"
                name="address"
                value={address?.address}
                onChange={(event) =>
                  setAddress({ ...address, address: event.target.value })
                }
              />
              <span style={{ color: "red" }}>
                {errorMessage?.address && errorMessage?.address}{" "}
              </span>
            </div>
            <div className="form-group">
              <label>city</label>
              <input
                type="text"
                placeholder="City"
                className="form-control"
                name="city"
                value={address?.city}
                onChange={(event) =>
                  setAddress({ ...address, city: event.target.value })
                }
              />
              <span style={{ color: "red" }}>
                {errorMessage?.city && errorMessage?.city}{" "}
              </span>
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                placeholder="Pincode"
                className="form-control"
                name="pincode"
                value={address?.pincode}
                onChange={(event) =>
                  setAddress({ ...address, pincode: event.target.value })
                }
              />
              <span style={{ color: "red" }}>
                {errorMessage?.pincode && errorMessage?.pincode}{" "}
              </span>
            </div>

            <button className="btn btn-outline-primary" onClick={submit}>
              Add Address
            </button>
          </form>
        </div>
        <div className="col-md-5">
          <CartSummery cartData={props.cartData} cartTotal={props.cartTotal} />
        </div>
      </div>
    </>
  );
}

export default connect(function (state, props) {
  return {
    cartData: state?.cart,
    cartTotal: state?.total,
    stage: state?.stage,
    address: state?.address,
  };
})(Address);
