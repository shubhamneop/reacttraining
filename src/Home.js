import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import Cake from "./Cake";
import CakeDetails from "./CakeDetails";
import axios from "axios";

function Home() {
  const [cakes, setCakes] = useState([]);
  useEffect(() => {
    let apiurl = "https://apibyashu.herokuapp.com/api/allCakes";
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
  const [getCake, setGetCake] = useState();

  const getDetails = (data) => {
    setGetCake(data);
  };

  return (
    <>
      <Carousel />
      <div className="row" style={{ padding: "20px" }}>
        {cakes?.length > 0 &&
          cakes.map((each, index) => {
            return <Cake cakedata={each} key={index} />;
          })}
      </div>
    </>
  );
}

export default Home;
