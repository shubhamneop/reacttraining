import React from "react";
import { Link } from "react-router-dom";

function Cake({ name, img, cakedata, getDetails }) {
  return (
    <div
      className="card col-md-3"
      onClick={() => getDetails && getDetails(cakedata)}
      style={{ width: "18rem", cursor: "pointer", marginBottom: "10px" }}
    >
      <Link to={"/cake/" + cakedata.cakeid}>
        <img
          src={img || cakedata.image}
          style={{ height: "200px", paddingTop: "10px" }}
          className="card-img-top"
          alt="..."
          title={cakedata?.name}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title" style={{ textAlign: "center" }}>
          {name || cakedata.name}
        </h5>
      </div>
    </div>
  );
}

export default Cake;
