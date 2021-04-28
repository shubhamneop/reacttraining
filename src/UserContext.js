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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default connect(function (state, props) {
  return {
    token: state?.user?.token,
    logintatstus: state?.isLogin,
    user: state?.user,
    username: state?.user?.name,
    isLogin: state?.isLogin,
    loading: state?.isFetching,
  };
})(UserProvider);
