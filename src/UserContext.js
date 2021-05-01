import React from "react";
import { connect } from "react-redux";

export const UserContext = React.createContext();

const UserProvider = (props) => {
  return (
    <UserContext.Provider
      value={{
        token: props.token,
        user: props.user,
        logintatstus: props.logintatstus,
        username: props.username,
        isLogin: props.isLogin,
        loading: props.loading,
        loadingauth: props.loadingauth,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default connect(function (state, props) {
  return {
    token: state?.auth?.user?.token,
    logintatstus: state?.auth?.isLogin,
    user: state?.auth?.user,
    username: state?.auth?.user?.name,
    isLogin: state?.auth?.isLogin,
    loading: state?.other?.isFetching,
    loadingauth: state?.auth?.isFetching,
  };
})(UserProvider);
