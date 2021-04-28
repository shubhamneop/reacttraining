import React, { Component } from "react";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import "./Modal.css";
import Backdrop from "./Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="Modal"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          <button
            className="btn btn-lg"
            onClick={this.props.modalClosed}
            style={{
              position: "fixed",
              top: "-.5em",
              right: "-.5em",
              color: "red",
            }}
            title="Close"
          >
            <CancelPresentationIcon />
          </button>
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
