import React, { useEffect } from "react";
import Cake from "./Cake";
import Carousel from "./Carousel";
import Spinner from "./UI/Spinner";
import { connect } from "react-redux";
import { SEARCH_CAKE_INIT } from "./redux/actionTypes";

function Search(props) {
  const { loading, dispatch, cakes } = props;
  const query = new URLSearchParams(props.location.search);
  const token = query.get("q");
  useEffect(() => {
    dispatch({
      type: SEARCH_CAKE_INIT,
      payload: token,
    });
  }, [props.location.search, token, dispatch]);

  return (
    <>
      <Carousel />
      <div className="" style={{ padding: "30px" }}>
        {loading ? (
          <Spinner />
        ) : (
          <div className="row">
            {cakes?.length > 0 ? (
              cakes.map((each, index) => {
                return <Cake cakedata={each} key={index} />;
              })
            ) : (
              <div style={{ margin: "auto" }}>No Data found</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default connect(function (state, props) {
  return {
    loading: state?.isFetching,
    cakes: state?.serchCakes,
  };
})(Search);
