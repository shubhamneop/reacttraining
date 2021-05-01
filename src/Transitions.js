import React, { useState } from "react";
import CssTransition from "react-transition-group/CSSTransition";
import "./UI/Modal.css";

function Transitions() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        className="btn btn-outline-info"
        style={{ margin: "auto", display: "flex" }}
        onClick={() => setShow((prevState) => !prevState)}
      >
        Toggle
      </button>
      <CssTransition
        in={show}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames="fade-slide"
      >
        {(state) => <div className="Modal">TEst modal</div>}
      </CssTransition>
      <br></br>
    </div>
  );
}

export default Transitions;
