import React, { useEffect, useState } from "react";
import Clock from "./Clock";
import { Link, withRouter } from "react-router-dom";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

function Navbar(props) {
  const [searchData, setSearchData] = useState("");

  const serach = (event) => {
    event.preventDefault();
    props.history.push(`/search?q=${searchData}`);
  };

  const enterPressed = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      props.history.push(`/search?q=${searchData}`);
    }
  };

  const makeLogout = (event) => {
    props.logout(event);
    props.history.push("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">
          {" "}
          <a className="navbar-brand">Cake`s Shop</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" tabindex="-1" aria-disabled="true">
                {localStorage?.name && <PermIdentityIcon />}{" "}
                {localStorage?.name || ""}
              </a>
            </li>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            {/* <label
              className="btn btn-outline-danger my-2 my-sm-0 disabled"
              style={{ marginRight: "5px" }}
            >
              <Clock />
            </label> */}

            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => setSearchData(event.target.value)}
              value={searchData}
              onKeyPress={enterPressed}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={serach}
            >
              Search
            </button>
            {props.logintatstus ? (
              <button
                onClick={makeLogout}
                className="btn btn-outline-danger my-2 my-sm-0"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                {" "}
                <button className="btn btn-outline-primary my-2 my-sm-0">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
