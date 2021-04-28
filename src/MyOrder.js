import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import Spinner from "./UI/Spinner";
import { getOrderInit, setOrderStatus } from "./redux/thunk/thunks";
import Modal from "./UI/Modal";
import { UserContext } from "./UserContext";

function MyOrder(props) {
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState("");
  const context = useContext(UserContext);
  const { isLogin, loading } = context;
  const { myOrder, onGetOrder, onSetOrderStatus, placeOrder } = props;
  useEffect(() => {
    if (!isLogin) {
      props.history.push("/");
    }
    onGetOrder();
  }, [onGetOrder, isLogin, props.history]);
  useEffect(() => {
    if (placeOrder) {
      onSetOrderStatus();
    }
    setModal(false);
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
        <div
          className="alert  container"
          role="alert"
          style={{ maxHeight: "400px", overflow: "auto" }}
        >
          <h4 className="alert-heading" style={{ textAlign: "center" }}>
            Order Details
          </h4>

          <table className="table" key={Math.random().toString()}>
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
          <table className="table table-striped" key={Math.random().toString()}>
            <tbody>
              {details?.cakes?.length > 0 &&
                details?.cakes.map((cake) => {
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
                })}
            </tbody>
          </table>

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
