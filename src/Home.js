import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import Cake from "./Cake";
import axios from "axios";
import Spinner from "./UI/Spinner";

function Home() {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    let apiurl = "https://apibyashu.herokuapp.com/api/allCakes";
    axios({
      url: apiurl,
      method: "get",
    })
      .then((response) => {
        console.log("all cake", response.data.data);
        setCakes(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

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

export default Home;
