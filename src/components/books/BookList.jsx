import React, { Fragment } from "react";

function BookList({
  isLoading,
  books,
  isLoggedIn,
  dispatch,
  deleteBooks,
  getBook,
}) {
  const bookList =
    books.length > 0
      ? books.map((item) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={item.id}
            >
              <div>{item.title}</div>
              <div className="btn-group" role="group">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => dispatch(getBook(item))}
                >
                  read
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  disabled={isLoggedIn}
                  onClick={() =>
                    dispatch(deleteBooks(item))
                      .unwrap()
                      .then((originalPromiseResult) => {
                        console.log(originalPromiseResult);
                      })
                      .catch((rejectedValueOrSerializedError) => {
                        console.log(rejectedValueOrSerializedError);
                      })
                  }
                >
                  delete
                </button>
              </div>
            </li>
          );
        })
      : "there is no books available";
  return (
    <Fragment>
      <h2>Book List</h2>
      {isLoading ? "loading....." : <ul className="list-group ">{bookList}</ul>}
    </Fragment>
  );
}

export default BookList;
