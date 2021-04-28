import React, { useEffect, useContext } from "react";
import Carousel from "./Carousel";
import Cake from "./Cake";
import Spinner from "./UI/Spinner";
import { connect } from "react-redux";
import { getAllCakeInit } from "./redux/thunk/thunks";
import { UserContext } from "./UserContext";

function Home(props) {
  const { dispatch, cakes } = props;
  const context = useContext(UserContext);
  const { loading } = context;
  useEffect(() => {
    dispatch(getAllCakeInit());
  }, [dispatch]);

  return (
    <>
      <Carousel />
      <div className="row" style={{ padding: "20px" }}>
        {loading ? (
          <Spinner
            className="spinnner-class"
            animation="border"
            variant="primary"
            size="lg"
          />
        ) : (
          cakes?.length > 0 &&
          cakes.map((each, index) => {
            return <Cake cakedata={each} key={index} />;
          })
        )}
      </div>
    </>
  );
}

export default connect(function (state, props) {
  return {
    cakes: state?.allCakes,
  };
})(Home);
