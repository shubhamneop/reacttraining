import React, { useState } from "react";

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
    if (user.email == "test@gmail.com" && user.password == "test") {
      setError("Login success");
      props.informlogin(user);
    } else {
      setError("Email & password required");
    }
  };
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <span style={{ color: "red" }}> </span>
      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" onChange={getEmail} />
        {user?.email}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="email" className="form-control" onChange={getPass} />
        <span style={{ color: "red" }}></span>
        {user?.password}
      </div>
      <button className="btn btn-primary" onClick={submit}>
        Go Online
      </button>
    </div>
  );
}

export default Login;
