import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "./UI/Spinner";

function MyOrder(props) {
  const { myOrder, loading, dispatch } = props;
  useEffect(() => {
    dispatch({
      type: "GET_ORDER_INIT",
    });
    dispatch({
      type: "SET_ORDER_STATUS",
    });
  }, [dispatch]);
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
            My Orders
          </h1>
          <div className="cart-design">
            <table className="table table-hover">
              <tbody>
                {myOrder.map(({ cakes, index }) => {
                  return cakes.map((cake, index1) => {
                    return (
                      <tr key={Math.random().toString()}>
                        <td className="text-center">
                          <img
                            className="media-object"
                            src={cake?.image}
                            style={{ width: "50px", height: "50px" }}
                            alt="..."
                          />{" "}
                        </td>
                        <td className="text-center">
                          <p
                            className="media-heading"
                            style={{ wordBreak: "break-all" }}
                          >
                            <strong>{cake?.name}</strong>
                          </p>
                        </td>
                        <td className="text-center">
                          <strong>${cake.price}</strong>
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default connect(function (state) {
  return {
    myOrder: state?.user_order,
    loading: state?.isFetching,
  };
})(MyOrder);
