import React from "react";
import "./ErrorBoundary.css";

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div id="notfound">
            <div className="notfound">
              <div className="notfound-404">
                <h1>500</h1>
                <h2>Something went wrong</h2>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
