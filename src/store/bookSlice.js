import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await fetch("http://localhost:3009/books");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//
export const insertBooks = createAsyncThunk(
  "books/insertBooks",
  async (bookData, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    try {
      bookData.userName = getState().auth.name;
      const response = await fetch("http://localhost:3009/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-type": "Application/json ; Charset=UTF-8",
        },
      });
      const data = await response.json();
      dispatch(logInsert({ name: "insertBook", status: "success" }));
      return data;
    } catch (error) {
      dispatch(logInsert({ name: "insertBook", status: "failed" }));
      return rejectWithValue(error.message);
    }
  }
);
//
export const deleteBooks = createAsyncThunk(
  "books/deleteBooks",
  async (item, thunkApi) => {
    const rejectWithValue = thunkApi;
    try {
      await fetch(`http://localhost:3009/books/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "Application/json ; Charset=UTF-8",
        },
      });
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//
export const getBook = createAsyncThunk(
  "books/getBook",
  async (item, thunkApi) => {
    const rejectWithValue = thunkApi;
    try {
      await fetch(`http://localhost:3009/books/${item.id}`, {
        method: "GET",
        headers: {
          "Content-type": "Application/json ; Charset=UTF-8",
        },
      });
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false, error: null , bookInfo: null },
  reducers: {},
  extraReducers: {
    //get books
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //insert books
    [insertBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [insertBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insertBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    // delete books
    [deleteBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [deleteBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((el) => el.id !== action.payload.id);
    },
    [deleteBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    // get Book
    [getBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [getBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookInfo = action.payload;
      // console.log(action.payload)
    },
    [getBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export default bookSlice.reducer;
