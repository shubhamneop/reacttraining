import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

function Login(props) {
  console.log("login props", props);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const [user, setUser] = useState();

  let getEmail = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  let getPass = (event) => {
    setUser({ ...user, password: event.target.value });
  };
  useEffect(() => {
    if (localStorage.token && localStorage.email) {
      props.history.push("/");
    }
  }, []);

  const submit = () => {
    if (!user.email || !user.password) {
      setError("Email & password required");
    } else {
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
            localStorage.email = response.data.email;
            props.history.push("/");
          } else {
            alert("Invalid Credentional");
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <span style={{ color: "red" }}> </span>
      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" onChange={getEmail} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" onChange={getPass} />
        <span style={{ color: "red" }}></span>
      </div>
      <button className="btn btn-primary" onClick={submit}>
        Login
      </button>
      <br></br>
      <div style={{ float: "left" }}>
        <Link to="/signup">New User? Click here</Link>
      </div>
    </div>
  );
}

export default withRouter(Login);
