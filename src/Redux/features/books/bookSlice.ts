import { IBook } from '@/Constants/constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  books: IBook[];
  wishlist: IBook[];
  readingList: IBook[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
};

const initialState: InitialState = {
  books: [],
  wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
  readingList: JSON.parse(localStorage.getItem('readingList') || '[]'),
  isLoading: false,
  isError: false,
  error: null,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooksStart: (state) => {
      state.isLoading = true;
    },
    setBooksSuccess: (state, action: PayloadAction<IBook[]>) => {
      // console.log('LLL', action.payload);
      state.isLoading = false;
      state.books = action.payload;
    },
    setBooksFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    addToWishlist: (state, action: PayloadAction<IBook>) => {
      const existsBook = state.wishlist.find(
        (book) => book._id === action.payload?._id
      );
      if (!existsBook) {
        state.wishlist.push(action.payload);
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<IBook>) => {
      state.wishlist = state.wishlist.filter(
        (product) => product._id !== action.payload._id
      );
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
    addToReadinglist: (state, action: PayloadAction<IBook>) => {
      const existsBook = state.readingList.find(
        (book) => book._id === action.payload?._id
      );
      if (!existsBook) {
        state.readingList.push(action.payload);
        localStorage.setItem('readingList', JSON.stringify(state.readingList));
      }
    },
    updateReadingList: (state, action: PayloadAction<IBook>) => {
      const existsBook = state.readingList.find(
        (book) => book._id === action.payload?._id
      );
      if (existsBook) {
        existsBook.status = action.payload.status;
        localStorage.setItem('readingList', JSON.stringify(state.readingList));
      }
    },
  },
});

export const {
  setBooksStart,
  setBooksFailure,
  setBooksSuccess,
  addToWishlist,
  removeFromWishlist,
  addToReadinglist,
  updateReadingList,
} = bookSlice.actions;

export default bookSlice.reducer;
