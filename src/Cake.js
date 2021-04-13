import React from "react";

var cake = "product17.jpg";
function Cake({ name, img, cakedata, getDetails }) {
  return (
    <div
      class="card col-md-2"
      onClick={() => getDetails(cakedata)}
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <img
        src={img || cakedata.image}
        style={{ height: "200px" }}
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">{name || cakedata.name}</h5>
      </div>
    </div>
  );
}

export default Cake;
