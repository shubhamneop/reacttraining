import React, { useEffect, useState } from "react";
import axios from "axios";
import Cake from "./Cake";
import CakeDetails from "./CakeDetails";
import Carousel from "./Carousel";
import Spinner from "./UI/Spinner";

function Search(props) {
  const [cakes, setCakes] = useState([]);
  const [getCake, setGetCake] = useState();
  const [loading, setLoading] = useState(false);
  console.log(props.location.search);
  const query = new URLSearchParams(props.location.search);
  const token = query.get("q");

  useEffect(() => {
    setLoading(true);
    let searchCakeApi = `https://apibyashu.herokuapp.com/api/searchcakes?q=${token}`;
    axios({
      url: searchCakeApi,
      method: "get",
    })
      .then((response) => {
        console.log("search result", response.data.data);
        setCakes(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [props.location.search]);
  const getDetails = (data) => {
    setGetCake(data);
  };
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
                return (
                  <Cake cakedata={each} getDetails={getDetails} key={index} />
                );
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
