import React, { useState } from "react";
import Carousel from "./Carousel";
import Cake from "./Cake";
import cakes from "./data";
import CakeDetails from "./CakeDetails";

var cake = "product17.jpg";
var product1 = "product1.jpg";
var product2 = "product2.jpg";
var product3 = "product3.jpg";
var product4 = "product10.jpg";

var cakeData = {
  name: "Random data",
  image: product4,
  price: "20",
  id: Math.random(10).toString(),
};

let data = [
  {
    name: "Random data",
    image: product4,
    price: "20",
    id: Math.random(10).toString(),
  },
  {
    name: "Random data 2",
    image: product2,
    price: "20",
    id: Math.random(10).toString(),
  },
  {
    name: "Random data 3",
    image: product3,
    price: "20",
    id: Math.random(10).toString(),
  },
];

function Home() {
  const [getCake, setGetCake] = useState();

  const getDetails = (data) => {
    setGetCake(data);
  };

  return (
    <>
      <Carousel />
      {getCake && <CakeDetails cakedata={getCake} />}
      <div className="row">
        {/* <Cake name="test" img={cake} />
        <Cake name="next" img={product1} />
        <Cake name="Random" img={product2} />
        <Cake name="Selelct" img={product3} /> */}
        <Cake cakedata={cakeData} getDetails={getDetails} />
        {cakes?.length > 0 &&
          cakes.map((each, index) => {
            return <Cake cakedata={each} getDetails={getDetails} key={index} />;
          })}
      </div>
    </>
  );
}

export default Home;
