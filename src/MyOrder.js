import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "./UI/Spinner";
import { getOrderInit, setOrderStatus } from "./redux/thunk/thunks";

function MyOrder(props) {
  const { myOrder, loading, onGetOrder, onSetOrderStatus, placeOrder } = props;
  useEffect(() => {
    onGetOrder();
  }, [onGetOrder]);
  useEffect(() => {
    if (placeOrder) {
      onSetOrderStatus();
    }
  }, [onSetOrderStatus, placeOrder]);

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
            {myOrder?.length > 0 ? (
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
                            />
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
            ) : (
              <div className="alert container" role="alert">
                <h4 className="alert-heading" style={{ textAlign: "center" }}>
                  Make Same Order !
                </h4>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    myOrder: state?.user_order,
    loading: state?.isFetching,
    placeOrder: state?.placeOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetOrder: () => dispatch(getOrderInit()),
    onSetOrderStatus: () => dispatch(setOrderStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);
