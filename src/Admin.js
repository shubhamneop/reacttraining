import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { UserContext } from "./UserContext";
import Spinner from "./UI/Spinner";
import { MDBDataTable } from "mdbreact";

export const Admin = (props) => {
  const context = useContext(UserContext);
  const { loading } = context;
  const { cakes } = props;
  const [data, setData] = useState({});

  useEffect(() => {
    const tabledata = {
      columns: [
        {
          label: "Cake Id",
          field: "cakeid",
          sort: "asc",
          width: 100,
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150,
        },

        {
          label: "Price",
          field: "price",
          sort: "asc",
          width: 200,
        },
      ],
      rows: cakes,
    };
    setData(tabledata);
  }, [cakes]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div style={{ margin: "30px" }}>
          <h1
            style={{
              margin: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              padding: "20px",
            }}
          >
            All Cakes
          </h1>
          <div className="cart-design">
            {cakes?.length > 0 ? (
              <MDBDataTable striped bordered data={data} />
            ) : (
              <div className="alert container" role="alert">
                <h4 className="alert-heading" style={{ textAlign: "center" }}>
                  No DATA FOUND !
                </h4>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cakes: state?.other?.allCakes,
  };
};

export default connect(mapStateToProps, null)(withRouter(Admin));
