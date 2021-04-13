import React from "react";
import { render } from "react-dom";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      onlineuser: 0,
      email: "",
      emailValid: false,
      emailErr: "Email is required",
      password: "",
      passValid: false,
      passErr: "Password is required",
    };
    // alert("in construction");
  }

  // componentDidMount() {
  //   alert("mounted");
  // }

  // componentDidUpdate() {
  //   alert("mounted update");
  // }

  // componentWillUnmount() {}

  goOnline = () => {
    this.setState({ onlineuser: this.state.onlineuser + 1 });
  };
  getEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  getPass = (event) => {
    this.setState({ password: event.target.value });
  };
  submit = () => {
    if (this.state.email == "") {
      this.setState({ emailValid: true });
    }
    if (this.state.password == "") {
      this.setState({ passValid: true });
    }
  };
  render() {
    return (
      <div style={{ width: "50%", margin: "auto" }}>
        <span style={{ color: "red" }}> </span>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            onChange={this.getEmail}
          />
          <span style={{ color: "red" }}>
            {" "}
            {this.state.emailValid && this.state.emailErr}
          </span>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="email"
            className="form-control"
            onChange={this.getPass}
          />
          <span style={{ color: "red" }}>
            {this.state.passValid && this.state.passErr}
          </span>
        </div>

        <button className="btn btn-primary" onClick={this.submit}>
          Go Online
        </button>
      </div>
    );
  }
}

export default Signup;
