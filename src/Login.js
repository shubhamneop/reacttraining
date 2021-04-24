import React, { useState, useEffect } from "react";
import axios, { loginApi } from "./api";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "./UI/Spinner";
import { toast } from "react-toastify";

function Login(props) {
  ///recoverpassword post {email:""}

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  let getEmail = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  let getPass = (event) => {
    setUser({ ...user, password: event.target.value });
  };
  useEffect(() => {
    if (localStorage.token) {
      props.history.push("/");
    }
  }, []);

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
      console.log(isValid);
    }
    if (!elements.password.value) {
      errors.password = "Plaese enter password";
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
    var form = document.getElementById("loginform");
    var errors = validate(form.elements);

    if (errors) {
      seterrorMessage(errors);
    } else {
      seterrorMessage({});
      setLoading(true);

      axios
        .post(loginApi, user)
        .then((response) => {
          console.log("login success", response.data);
          if (response.data.token) {
            localStorage.token = response.data.token;
            props.dispatch({
              type: "LOGIN",
              payload: response.data,
            });
            toast.success(`Successfully Login !`, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setLoading(false);
            props.history.push("/");
          } else {
            toast.error(`${response.data.message} !`, {
              position: toast.POSITION.TOP_RIGHT,
            });
            //alert("Invalid Credentional");
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form id="loginform" className="custom-form">
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={getEmail}
            />
            <span style={{ color: "red" }}>{errorMessage?.email}</span>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={getPass}
            />
            <span style={{ color: "red" }}>{errorMessage?.password}</span>
          </div>
          <button className="btn btn-primary" onClick={submit}>
            Login
          </button>
          <br></br>
          <br></br>
          <div style={{ float: "left" }}>
            <Link to="/signup">New User? Click here</Link>
          </div>
          <div style={{ float: "right" }}>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <br></br>
        </form>
      )}
    </>
  );
}

export default connect()(withRouter(Login));
