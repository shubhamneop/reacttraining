import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "./UI/Spinner";

function Login(props) {
  const [error, setError] = useState();

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

  const submit = () => {
    if (!user?.email || !user?.password) {
      setError("Email & password required");
    } else {
      setLoading(true);
      let apiurl = "https://apibyashu.herokuapp.com/api/login";
      axios({
        url: apiurl,
        method: "post",
        data: user,
      })
        .then((response) => {
          console.log("login success", response.data);
          if (response.data.token) {
            localStorage.token = response.data.token;
            props.dispatch({
              type: "LOGIN",
              payload: response.data,
            });
            setLoading(false);
            props.history.push("/");
          } else {
            alert("Invalid Credentional");
            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="custom-form">
          <span style={{ color: "red" }}> </span>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" onChange={getEmail} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              onChange={getPass}
            />
            <span style={{ color: "red" }}>{error}</span>
          </div>
          <button className="btn btn-primary" onClick={submit}>
            Login
          </button>
          <br></br>
          <div style={{ float: "left" }}>
            <Link to="/signup">New User? Click here</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default connect()(withRouter(Login));
