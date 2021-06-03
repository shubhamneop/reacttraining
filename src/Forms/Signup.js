import React from "react";
import Spinner from "../UI/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { SignupThunk } from "../redux/thunk/authThunks";
import { UserContext } from "../UserContext";

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
  static contextType = UserContext;
  user = {};
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

  validate = (elements) => {
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
    if (!elements.name.value) {
      errors.name = "Plaese enter name";
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

  submit = (event) => {
    event.preventDefault();
    var form = document.getElementById("signupform");
    var errors = this.validate(form.elements);

    if (errors) {
      this.setState({ errorMessage: errors });
    } else {
      this.props.dispatch(SignupThunk(this.user));
    }
  };

  render() {
    const { loading } = this.props;
    console.log(this.props, this.context);
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <form id="signupform" className="custom-form">
            <h2 style={{ textAlign: "center" }}>Sign Up</h2>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={this.getEmail}
              />
              <span style={{ color: "red" }}>
                {this.state.errorMessage?.email}
              </span>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={this.getName}
              />
              <span style={{ color: "red" }}>
                {this.state.errorMessage?.name}
              </span>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={this.getPass}
              />
              <span style={{ color: "red" }}>
                {this.state.errorMessage?.password}
              </span>
            </div>

            <button className="btn btn-primary" onClick={this.submit}>
              Signup
            </button>
            <br></br>

            <div style={{ float: "left" }}>
              <Link to="/login">Have a account? Click here</Link>
            </div>
            <br></br>
          </form>
        )}
      </>
    );
  }
}

export default connect(function (state, props) {
  return {
    loading: state?.auth?.isFetching,
  };
})(Signup);
