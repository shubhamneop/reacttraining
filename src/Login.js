import React, { useState } from "react";
import axios from "axios";

function Login(props) {
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
        })
        .catch((error) => console.log(error));
      props.informlogin(user);
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
        Go Online
      </button>
    </div>
  );
}

export default Login;
