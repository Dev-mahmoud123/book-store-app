import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logInOut } from "../store/authSlice";

function Header() {
  const { error } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Fragment>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="nav bg-dark p-2 justify-content-between  align-items-center">
        <div className="logo text-white">My Book</div>
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(logInOut(isLoggedIn))}
        >
          {isLoggedIn ? "Log out" : "Log in"}
        </button>
      </div>
    </Fragment>
  );
}

export default Header;
