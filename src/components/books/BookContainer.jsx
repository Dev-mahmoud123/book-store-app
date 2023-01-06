import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, deleteBooks , getBook } from "../../store/bookSlice";
import BookInfo from "./BookInfo";
import BookList from "./BookList";

function BookContainer() {
  const { isLoading, books ,  } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col-6">
          <BookList
            isLoading={isLoading}
            books={books}
            isLoggedIn={!isLoggedIn}
            deleteBooks={deleteBooks}
            dispatch={dispatch}
            getBook ={getBook}
          />
        </div>
        <div className="col-6">
          <BookInfo/>
        </div>
      </div>
    </Fragment>
  );
}

export default BookContainer;
