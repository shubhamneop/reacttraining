import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import RateReviewIcon from "@material-ui/icons/RateReview";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Cart from "./Cart";
import { connect } from "react-redux";
var cake = "/product17.jpg";

function CakeDetails(props) {
  let params = useParams();
  console.log(params.cakeid);
  const [cakedata, setCakes] = useState();
  useEffect(() => {
    let detailsapiurl =
      "https://apibyashu.herokuapp.com/api/cake/" + params.cakeid;
    axios({
      url: detailsapiurl,
      method: "get",
    })
      .then((response) => {
        console.log("all cake", response.data.data);
        setCakes(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const addToCart = () => {
    if (!props?.token) {
      alert("Please Login !");
      return false;
    }
    let detailsapiurl = "https://apibyashu.herokuapp.com/api/addcaketocart";
    axios({
      url: detailsapiurl,
      method: "post",
      data: {
        cakeid: cakedata.cakeid,
        name: cakedata.name,
        image: cakedata.image,
        price: cakedata.price,
        weight: cakedata.weight,
      },
      headers: {
        authtoken: props.token,
      },
    })
      .then((response) => {
        console.log("add to cart", response);
        props.history.push("/cart");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div
        className="row"
        style={{
          backgroundColor: "lightgray",
          paddingTop: "30px",
          margin: "20px",
          paddingBottom: "20px",
        }}
      >
        <div className="col-md-6">
          <img
            style={{ height: "600px", maxWidth: "500px" }}
            src={cakedata?.image || cake}
          />
          <br></br>
          {cakedata?.ingredients.length > 0 && (
            <h4 style={{ paddingTop: "10px", wordBreak: "break-all" }}>
              INGREDIETS:{" "}
              {cakedata?.ingredients.length > 0 &&
                cakedata?.ingredients.map((ingredient, index) => {
                  return <lable key={index}>{ingredient}, </lable>;
                })}
            </h4>
          )}
        </div>
        <div className="col-md-6">
          <h2 style={{ fontSize: "55px", fontWeight: "900" }}>
            {cakedata?.name}
          </h2>

          <br></br>
          <p style={{ fontSize: "20px" }}>
            {cakedata?.ratings}{" "}
            <StarOutlineIcon
              style={{
                color: "orange",
                fontWeight: "bolder",
                fontSize: "40px",
              }}
            />{" "}
          </p>
          <p>
            {cakedata?.reviews} <RateReviewIcon />{" "}
          </p>
          <p style={{ wordBreak: "break-all" }}>{cakedata?.description}</p>
          <h2>
            CURRENT PRICE:{" "}
            <span style={{ color: "orange" }}>$ {cakedata?.price}</span>
          </h2>

          <h3>WEIGHT: {cakedata?.weight} KG</h3>
          <h2>
            FLAVOUR:{" "}
            <span style={{ color: "orange" }}>
              {cakedata?.flavour || "dumy"}
            </span>
          </h2>
          <h3>TYPE : {cakedata?.type}</h3>

          <br></br>
          <div style={{ display: "flex" }}>
            <button
              onClick={addToCart}
              type="button"
              class="btn btn-warning btn-lg"
            >
              Add To Cart!
            </button>
            <div style={{ padding: "10px" }} />
            <button type="button" class="btn btn-outline-light btn-lg">
              <FavoriteIcon style={{ color: "red" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(function (state, props) {
  return {
    token: state?.user?.token,
  };
})(CakeDetails);
