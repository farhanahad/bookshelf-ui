import { useLogOutMutation } from '@/Redux/api/apiSlice';
import { setLogOut } from '@/Redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || '/';

  const [logOut, { data: logOutData, error: logOutError }] =
    useLogOutMutation();

  const handleLogOut = async () => {
    await logOut({}); // Await the mutation
  };

  useEffect(() => {
    if (logOutData?.success) {
      dispatch(
        setLogOut({
          _id: null,
          email: null,
          name: null,
          token: null,
        })
      );
      toast.success(logOutData.message);
      navigate(from, { replace: true });
    } else if (logOutError) {
      // toast.error(logOutError?.data?.message);
      toast.error('Failed to logout!');
    }
  }, [
    dispatch,
    logOutData?.message,
    logOutData?.success,
    logOutError,
    navigate,
    from,
  ]);

  return (
    <div className="navbar flex justify-between bg-neutral text-neutral-content">
      <div className="navbar-start md:w-full lg:w-1/3 ">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden swap swap-rotate"
          >
            <input type="checkbox" />
            {/* hamburger icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 swap-off "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => setClicked(!clicked)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>

            {/* close icon */}
            <svg
              className="swap-on fill-current h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              onClick={() => setClicked(!clicked)}
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
          {clicked && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content m-0 z-[1] p-4 shadow rounded w-screen left-[-8px] bg-neutral text-neutral-content"
            >
              <li className="font-medium">
                <Link className="hover:text-neutral-content" to="/books">
                  Books
                </Link>
              </li>
              {!user?.email && (
                <>
                  <li className="font-medium">
                    <Link className="hover:text-neutral-content" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="font-medium">
                    <Link className="hover:text-neutral-content" to="/signup">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
              {user?.email && (
                <>
                  <li className="font-medium">
                    <Link className="hover:text-neutral-content" to="/wishlist">
                      Wishlist
                    </Link>
                  </li>
                  <li className="font-medium">
                    <Link className="hover:text-neutral-content" to="reading">
                      Currently Reading
                    </Link>
                  </li>
                  <li className="font-medium">
                    <Link className="hover:text-neutral-content" to="/add-book">
                      Add Book
                    </Link>
                  </li>
                  <li onClick={handleLogOut} className="font-medium">
                    <p className="hover:text-neutral-content">Logout</p>
                  </li>
                  <li className="font-medium">
                    <p className="hover:text-neutral-content">{user?.name}</p>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
        <Link className="font-semibold italic text-base" to="/">
          BookShelf
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex md:w-full lg:w-2/3">
        <ul className="menu menu-horizontal px-1">
          <li className="font-medium text-base">
            <Link className="hover:text-neutral-content " to="/books">
              Books
            </Link>
          </li>
          {!user?.email && (
            <>
              <li className="font-medium text-base">
                <Link className="hover:text-neutral-content" to="/login">
                  Login
                </Link>
              </li>
              <li className="font-medium text-base">
                <Link className="hover:text-neutral-content" to="/signup">
                  Sign up
                </Link>
              </li>
            </>
          )}
          {user?.email && (
            <>
              <li className="font-medium text-base">
                <Link className="hover:text-neutral-content" to="/wishlist">
                  Wishlist
                </Link>
              </li>
              <li className="font-medium text-base">
                <Link className="hover:text-neutral-content" to="/reading">
                  Currently Reading
                </Link>
              </li>
              <li className="font-medium text-base">
                <Link className="hover:text-neutral-content" to="/add-book">
                  Add Book
                </Link>
              </li>
              <li onClick={handleLogOut} className="font-medium text-base">
                <p className="hover:text-neutral-content">Logout</p>
              </li>

              <li className="font-medium text-base">
                <p className="hover:text-neutral-content">{user?.name}</p>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
