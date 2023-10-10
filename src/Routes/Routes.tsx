import App from '@/App';
import AddNewBook from '@/Pages/AddNewBook';
import BookDetails from '@/Pages/BookDetails';
import Books from '@/Pages/Books';
import CurrentlyReading from '@/Pages/CurrentlyReading';
import EditBook from '@/Pages/EditBook';
import Home from '@/Pages/Home';
import Login from '@/Pages/Login';
import SignUp from '@/Pages/SignUp';
import Wishlist from '@/Pages/Wishlist';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import NotFound from '@/Pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/details/:id',
        element: <BookDetails />,
      },
      {
        path: '/edit/:id',
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-book',
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: '/reading',
        element: (
          <PrivateRoute>
            <CurrentlyReading />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
