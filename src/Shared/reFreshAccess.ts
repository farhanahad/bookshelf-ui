/* eslint-disable @typescript-eslint/ban-types */
import { Dispatch } from '@reduxjs/toolkit';
import { setLoading, setUser } from '@/Redux/features/user/userSlice';

// Define a function that takes the necessary arguments
const refreshAccessToken = async (
  refreshToken: string | undefined,
  dispatch: Dispatch,
  refresh: Function, // Replace with the actual type if available
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (refreshToken) {
    try {
      dispatch(setLoading(true));
      const res = await refresh({});
      if (res.data.success) {
        const { email, name, _id } = res.data.data.user;
        const { accessToken } = res.data.data;
        dispatch(setUser({ _id, email, name, token: accessToken }));
      }
    } catch (error) {
      // Handle error
    } finally {
      setRefreshing(false);
      dispatch(setLoading(false));
    }
  } else {
    setRefreshing(false);
  }
};

export default refreshAccessToken;
