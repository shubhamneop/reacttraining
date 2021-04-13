import React from "react";

function CakeDetails({ cakedata }) {
  return (
    <div>
      <div
        className="row"
        style={{
          backgroundColor: "lightgray",
          paddingTop: "30px",
          margin: "20px",
        }}
      >
        <div className="col-md-6">
          <img style={{ height: "100%" }} src={cakedata.image} />
        </div>
        <div className="col-md-6">
          <h2 style={{ fontSize: "55px", fontWeight: "900" }}>
            {cakedata?.name}
          </h2>

          <br></br>
          <p>30 Reviews</p>
          <p style={{ wordBreak: "break-all" }}>Test descriptiond.........</p>
          <h2>
            CURRENT PRICE:{" "}
            <span style={{ color: "orange" }}>$ {cakedata?.price}</span>
          </h2>
          <p style={{ wordBreak: "break-all" }}>
            ************************************
          </p>
          <h3>WEIGHT: 3KG</h3>
          <h2>
            FLAVOUR:{" "}
            <span style={{ color: "orange" }}>
              {cakedata?.flavour || "dumy"}
            </span>
          </h2>
          <h3>TYPE</h3>
          <ul style={{ listStyleType: "none" }}>
            <li>Tets1</li>
            <li>Tets1</li>
            <li>Tets1</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CakeDetails;
