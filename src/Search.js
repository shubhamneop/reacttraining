import React, { useEffect, useState } from "react";
import axios from "axios";
import Cake from "./Cake";
import CakeDetails from "./CakeDetails";

function Search() {
  const [cakes, setCakes] = useState([]);
  const [search, setSearch] = useState("");
  const [getCake, setGetCake] = useState();

  useEffect(() => {}, []);
  let searchData = () => {
    let apiurl = `https://apibyashu.herokuapp.com/api/searchcakes?q=${search}`;
    axios({
      url: apiurl,
      method: "get",
    })
      .then((response) => {
        console.log("search result", response.data.data);
        setCakes(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  const getDetails = (data) => {
    setGetCake(data);
  };
  return (
    <>
      <div style={{ width: "50%", margin: "auto" }}>
        <span style={{ color: "red" }}> </span>
        <div className="form-group">
          <label>Search</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={searchData}>
          Search
        </button>
      </div>
      <div>Search Result</div>
      {getCake && <CakeDetails cakedata={getCake} />}
      <div className="container">
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
      </div>
    </>
  );
}

export default Search;
