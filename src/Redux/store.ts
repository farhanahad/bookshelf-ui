import { configureStore } from '@reduxjs/toolkit';
import api from './api/apiSlice';
import bookReducer from './features/books/bookSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
