import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
var cake = "/product17.jpg";

function CakeDetails() {
  let params = useParams();
  console.log(params.cakeid);
  const [cakedata, setCakes] = useState();
  useEffect(() => {
    let apiurl = "https://apibyashu.herokuapp.com/api/cake/" + params.cakeid;
    axios({
      url: apiurl,
      method: "get",
    })
      .then((response) => {
        console.log("all cake", response.data.data);
        setCakes(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
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
          <img
            style={{ height: "700px", maxWidth: "700px" }}
            src={cakedata?.image || cake}
          />
        </div>
        <div className="col-md-6">
          <h2 style={{ fontSize: "55px", fontWeight: "900" }}>
            {cakedata?.name}
          </h2>

          <br></br>
          <p>{cakedata?.ratings} *</p>
          <p>{cakedata?.reviews} Reviews</p>
          <p style={{ wordBreak: "break-all" }}>{cakedata?.description}</p>
          <h2>
            CURRENT PRICE:{" "}
            <span style={{ color: "orange" }}>$ {cakedata?.price}</span>
          </h2>
          <p style={{ wordBreak: "break-all" }}>
            ************************************
          </p>
          <h3>WEIGHT: {cakedata?.weight}</h3>
          <h2>
            FLAVOUR:{" "}
            <span style={{ color: "orange" }}>
              {cakedata?.flavour || "dumy"}
            </span>
          </h2>
          <h3>TYPE : {cakedata?.type}</h3>
        </div>
      </div>
    </div>
  );
}

export default CakeDetails;
