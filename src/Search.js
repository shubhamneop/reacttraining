import React, { useEffect, useState } from "react";
import axios, { searchCakesApi } from "./api";
import Cake from "./Cake";
import Carousel from "./Carousel";
import Spinner from "./UI/Spinner";

function Search(props) {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams(props.location.search);
  const token = query.get("q");
  useEffect(() => {
    setLoading(true);
    axios
      .get(searchCakesApi + token)
      .then((response) => {
        console.log("search result", response.data.data);
        setCakes(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [props.location.search, token]);

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

export default Search;
