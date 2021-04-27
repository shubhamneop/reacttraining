import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Spinner from "./UI/Spinner";
import { getOrderInit, setOrderStatus } from "./redux/thunk/thunks";
import Modal from "./UI/Modal";

function MyOrder(props) {
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState("");
  const { myOrder, loading, onGetOrder, onSetOrderStatus, placeOrder } = props;
  useEffect(() => {
    onGetOrder();
  }, [onGetOrder]);
  useEffect(() => {
    if (placeOrder) {
      onSetOrderStatus();
    }
  }, [onSetOrderStatus, placeOrder]);

  const onClose = (event) => {
    event.preventDefault();
    setModal(false);
    setDetails("");
  };

  const showDetails = (data) => {
    setDetails(data);
    setModal(true);
  };

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
                  {myOrder.map((data, index) => {
                    return data.cakes.map((cake, index1) => {
                      return (
                        <tr
                          key={Math.random().toString()}
                          onClick={() => showDetails(data)}
                        >
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
      <Modal
        show={modal}
        modalClosed={onClose}
        style={{ width: "70%", left: "15%" }}
      >
        <div className="alert  container" role="alert">
          <h4 className="alert-heading" style={{ textAlign: "center" }}>
            Order Details
          </h4>

          <table className="table table-hover">
            <thead>
              <tr>
                <th className="text-center">Order ID</th>
                <th className="text-center">Name</th>
                <th className="text-center">Address</th>
                <th className="text-center">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr key={Math.random().toString()}>
                <td className="text-center">{details?.orderid}</td>
                <td className="text-center">
                  <p
                    className="media-heading"
                    style={{ wordBreak: "break-all" }}
                  >
                    {details?.name}
                  </p>
                </td>
                <td className="text-center">
                  <p
                    className="media-heading"
                    style={{ wordBreak: "break-all" }}
                  >
                    {details?.address},{details?.city}, {details?.pincode},{" "}
                    {details?.phone}{" "}
                  </p>
                </td>
                <td className="text-center">${details?.price}</td>
              </tr>
            </tbody>
          </table>
          <hr />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              <button className="btn btn-danger btn-lg" onClick={onClose}>
                Close
              </button>
            </p>
          </div>
        </div>
      </Modal>
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
