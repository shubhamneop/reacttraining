import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "./UI/Spinner";
import { toast } from "react-toastify";

function Password(props) {
  ///recoverpassword post {email:""}

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      let apiurl = "https://apibyashu.herokuapp.com/api/recoverpassword";
      axios({
        url: apiurl,
        method: "post",
        data: email,
      })
        .then((response) => {
          console.log("forgot password response.. ", response.data);
          if (response.data.errorMessage) {
            toast.error(`${response.data.errorMessage} !`, {
              position: toast.POSITION.TOP_RIGHT,
            });
            //alert(response.data.errorMessage);
          }
          setLoading(false);
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

export default connect()(withRouter(Password));
