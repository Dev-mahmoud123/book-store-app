import React, { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertBooks } from "../store/bookSlice";
import {logInOut} from "../store/authSlice"

function AddForm() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  //
  const dispatch = useDispatch();
  const title = useRef(null);
  const price = useRef(null);
  const description = useRef(null);
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      price: price.current.value,
      description: description.current.value,
    };
    dispatch(insertBooks(data));
    title.current.value = null;
    price.current.value = null;
    description.current.value = null;
  };

  return (
    <Fragment>
      <h2 className="text-center mt-3">Insert Book</h2>
      <form style={{ width: "500px", margin: "auto" }} onSubmit={handleSubmit}>
        <label htmlFor="title" className="form-label">
          title
        </label>
        <input type="text" className="form-control" ref={title} />
        <label htmlFor="price" className="form-label">
          price
        </label>
        <input type="text" className="form-control" ref={price} />
        <label htmlFor="description" className="form-label">
          description
        </label>
        <textarea type="text" className="form-control mb-3" ref={description} />
        <input
          type="submit"
          value="submit"
          className="btn btn-primary"
          disabled={!isLoggedIn}
        />
      </form>
    </Fragment>
  );
}

export default AddForm;
