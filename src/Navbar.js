import React from "react";
import Clock from "./Clock";
import { Link } from "react-router-dom";

function Navbar(props) {
  const serach = (event) => {
    event.preventDefault();
    alert("Search function");
  };
  var count = 0;

  const increment = () => {
    count = count + 1;
    console.log("in increment", count);
  };
  const decrement = () => {
    count = count--;
    console.log("in dccrement", count);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">
          {" "}
          <a className="navbar-brand">My Cake</a>
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
              <a
                className="nav-link disabled"
                href="#"
                tabindex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <label
              className="btn btn-outline-danger my-2 my-sm-0 disabled"
              style={{ marginRight: "5px" }}
            >
              <Clock />
            </label>

            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={serach}
            >
              Search
            </button>
            {props.logintatstus ? (
              <button className="btn btn-outline-danger my-2 my-sm-0">
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
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
