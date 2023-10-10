import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react'; // Import useState
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { useRefreshTokenMutation } from '@/Redux/api/apiSlice';
import Cookies from 'js-cookie';
import refreshAccessToken from '@/Shared/reFreshAccess';

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(true); // Use a state variable
  // const refreshToken = Cookies.get('refreshToken');
  const [refresh] = useRefreshTokenMutation();

  // useEffect(() => {
  //   refreshAccessToken(refreshToken, dispatch, refresh, setRefreshing);
  // }, [dispatch, isLoading, refresh, refreshToken, user]);

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken');
    if (refreshToken) {
      refreshAccessToken(refreshToken, dispatch, refresh, setRefreshing);
    } else {
      setRefreshing(false);
    }
  }, []);

  // console.log('User::', user);

  if (refreshing) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  if (!user?.email && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
