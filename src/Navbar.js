import React, { useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { connect } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { toast } from "react-toastify";
import { LogoutAsync } from "./redux/thunk/authThunks";
import { UserContext } from "./UserContext";

let useX = () => {
  useEffect(() => {
    alert("hooks");
  }, []);
};
function Navbar(props) {
  const [searchData, setSearchData] = useState("");
  const context = useContext(UserContext);
  const { logintatstus, username } = context;
  const serach = (event) => {
    event.preventDefault();
    props.history.push(`/search?q=${searchData}`);
  };
  //useX();
  const enterPressed = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      props.history.push(`/search?q=${searchData}`);
    }
  };

  const makeLogout = (event) => {
    event.preventDefault();
    props.onLogout();
    toast.success(`Logout Successfully !`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    props.history.push("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light  navbar-color">
        <Link to="/">
          {" "}
          <span className="navbar-brand">Cake`s Shop</span>
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
              <span className="nav-link" aria-disabled="true">
                {username && <PermIdentityIcon />} {username || ""}
              </span>
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
              className="btn btn-outline-success my-2 mr-sm-2 my-sm-0"
              onClick={serach}
            >
              Search
            </button>
            <Link to="/admin">
              <button
                className="btn btn-outline-warning mr-sm-2"
                tabIndex="-1"
                aria-disabled="true"
              >
                Admin
              </button>
            </Link>
            {logintatstus ? (
              <>
                <Link to="/cart">
                  <button
                    className="btn btn-outline-warning mr-sm-2"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    <ShoppingCartIcon />
                    {props.cart?.length > 0 && props.cart?.length}
                  </button>
                </Link>
                <Link to="/my-orders">
                  <button
                    className="btn btn-outline-info mr-sm-2"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    My Orders
                  </button>
                </Link>

                <button
                  onClick={makeLogout}
                  className="btn btn-outline-danger my-2 mr-sm-2 my-sm-0"
                >
                  Logout
                </button>
              </>
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

const mapStateToProps = (state) => {
  return {
    cart: state?.other?.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(LogoutAsync()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
