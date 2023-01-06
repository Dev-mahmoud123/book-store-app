import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
function BookInfo() {
  const {bookInfo} = useSelector((state) => state.books);

  

  return (
    <Fragment>
      <h2>Book Details</h2>
      {bookInfo == null ? (
        <div className="alert alert-secondary">
          There is no books selected yet. Please Select!
        </div>
      ) : (
        <div className="bookInfo">
          <p>title: {bookInfo.title}</p>
          <p>description: {bookInfo.description}</p>
          <p>userName: {bookInfo.userName}</p>
          <p>price: {bookInfo.price}</p>
        </div>
      )}
    </Fragment>
  );
}

export default BookInfo;
