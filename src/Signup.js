import React from "react";
import axios from "axios";
import Spinner from "./UI/Spinner";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      onlineuser: 0,
      email: "",
      emailValid: false,
      emailErr: "",
      password: "",
      passValid: false,
      passErr: "Password is required",
      loading: false,
    };
    // alert("in construction");
  }
  user = {};

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
    this.user.email = event.target.value;
  };
  getPass = (event) => {
    this.user.password = event.target.value;
  };
  getName = (event) => {
    this.user.name = event.target.value;
  };
  submit = () => {
    if (!this.user.email || !this.user.password || !this.user.name) {
      this.setState({ errorMessage: "Please fill details" });
    } else {
      this.setState({ loading: true });
      let apiurl = "https://apibyashu.herokuapp.com/api/register";
      axios({
        url: apiurl,
        method: "post",
        data: this.user,
      })
        .then((response) => {
          this.setState({ loading: false });
          console.log("register", response.data);
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log(error);
        });
    }
    console.log("user", this.user);
  };
  render() {
    return (
      <>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div className="custom-form">
            <span style={{ color: "red" }}> </span>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                onChange={this.getEmail}
              />
              <span style={{ color: "red" }}> </span>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                onChange={this.getName}
              />
              <span style={{ color: "red" }}> </span>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                onChange={this.getPass}
              />
              <span style={{ color: "red" }}>{this.state.errorMessage}</span>
            </div>

            <button className="btn btn-primary" onClick={this.submit}>
              Signup
            </button>
          </div>
        )}
      </>
    );
  }
}

export default Signup;
