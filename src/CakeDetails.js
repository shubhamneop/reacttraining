import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import RateReviewIcon from "@material-ui/icons/RateReview";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import Spinner from "./UI/Spinner";
import { toast } from "react-toastify";
import { GET_CAKE_INIT, ADD_CART_INIT } from "./redux/actionTypes";
import { UserContext } from "./UserContext";
var cake = "/product17.jpg";

function CakeDetails(props) {
  let params = useParams();
  const { history, dispatch, cakedata, addtoCart } = props;
  const context = useContext(UserContext);
  const { loading, token } = context;
  useEffect(() => {
    dispatch({
      type: GET_CAKE_INIT,
      payload: params.cakeid,
    });
  }, [params.cakeid, dispatch]);

  useEffect(() => {
    if (addtoCart) {
      history.push("/cart");
    }
  }, [history, addtoCart]);

  const addToCart = () => {
    if (!token) {
      toast.error("Please Login !", {
        position: toast.POSITION.TOP_RIGHT,
      });

      //alert("Please Login !");
      return false;
    } else {
      dispatch({
        type: ADD_CART_INIT,
        payload: {
          cakeid: cakedata.cakeid,
          name: cakedata.name,
          image: cakedata.image,
          price: cakedata.price,
          weight: cakedata.weight,
        },
        history: history,
      });
    }
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
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
              alt="..."
            />
            <br></br>
            {cakedata?.ingredients.length > 0 && (
              <h4 style={{ paddingTop: "10px", wordBreak: "break-all" }}>
                INGREDIETS:{" "}
                {cakedata?.ingredients.length > 0 &&
                  cakedata?.ingredients.map((ingredient, index) => {
                    return <label key={index}>{ingredient}, </label>;
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
              {cakedata?.cakeid && (
                <button
                  onClick={addToCart}
                  type="button"
                  className="btn btn-warning btn-lg"
                >
                  Add To Cart!
                </button>
              )}
              <div style={{ padding: "10px" }} />
              <button type="button" className="btn btn-outline-light btn-lg">
                <FavoriteIcon style={{ color: "red" }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(function (state, props) {
  return {
    cakedata: state?.other?.cakeData,
    addtoCart: state?.other?.addToCart,
  };
})(CakeDetails);
