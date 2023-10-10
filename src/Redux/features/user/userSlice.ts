import { User } from '@/Constants/constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// [x: string]: any;

type InitialState = {
  user: User;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
};

const initialState: InitialState = {
  user: {
    _id: null,
    email: null,
    name: null,
    token: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload || {
        _id: null,
        email: null,
        name: null,
        token: null,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLogOut: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload || {
        _id: null,
        email: null,
        name: null,
        token: null,
      };
    },
  },
  //   extraReducers: (builder) => {},
});

export const { setUser, setLoading, setLogOut } = userSlice.actions;

export default userSlice.reducer;
