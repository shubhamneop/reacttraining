import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Cake from "./Cake";
import Spinner from "./UI/Spinner";
import { connect } from "react-redux";

function Home(props) {
  const { loading, dispatch, cakes } = props;
  useEffect(() => {
    dispatch({
      type: "GET_ALLCAKE_INIT",
    });
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
    loading: state?.isFetching,
    cakes: state?.allCakes,
  };
})(Home);
