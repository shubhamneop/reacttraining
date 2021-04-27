import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner";

function Password(props) {
  const [email, setEmail] = useState("");
  const { loading, dispatch } = props;
  useEffect(() => {
    if (localStorage.token) {
      props.history.push("/");
    }
  }, [props.history]);

  const [errorMessage, seterrorMessage] = useState({});
  const validate = (elements) => {
    var errors = {};

    if (!elements.email.value) {
      errors.email = "Plaese enter email";
    } else if (elements.email.value) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      var isValid = pattern.test(elements.email.value);
      if (!isValid) {
        errors.email = "Plaese enter valid email";
      }
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
    var form = document.getElementById("forgotform");
    var errors = validate(form.elements);

    if (errors) {
      seterrorMessage(errors);
    } else {
      seterrorMessage({});
      dispatch({
        type: "FORGOT_PASSWORD_INIT",
        payload: { email: email },
      });
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form id="forgotform" className="custom-form">
          <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <span style={{ color: "red" }}>{errorMessage?.email}</span>
          </div>
          <button className="btn btn-primary" onClick={submit}>
            Submit
          </button>
          <br></br>
          <br></br>
          <div style={{ float: "left" }}>
            <Link to="/login">Login ? CLick here</Link>
          </div>
          <br></br>
        </form>
      )}
    </>
  );
}

export default connect(function (state, props) {
  return {
    loading: state?.isFetching,
  };
})(withRouter(Password));