import React from "react";
import { Link } from "react-router-dom";

function Cake({ name, img, cakedata, getDetails }) {
  return (
    <div
      class="card col-md-2"
      onClick={() => getDetails && getDetails(cakedata)}
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <Link to={"/cake/" + cakedata.cakeid}>
        <img
          src={img || cakedata.image}
          style={{ height: "200px" }}
          class="card-img-top"
          alt="..."
        />
      </Link>
      <div class="card-body">
        <h5 class="card-title">{name || cakedata.name}</h5>
      </div>
    </div>
  );
}

export default Cake;
