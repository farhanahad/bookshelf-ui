/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs, User } from '@/Constants/constants';
import { useLogInMutation } from '@/Redux/api/apiSlice';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '@/Redux/hooks';
import { setUser } from '@/Redux/features/user/userSlice';

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const from = location.state?.from?.pathname || '/';

  const [userData, setUserData] = useState<User>();

  const [logIn, { data: logInData, error: loginError }] = useLogInMutation();

  const handleLogIn: SubmitHandler<Inputs> = async (data) => {
    try {
      const res: any = await logIn(data);
      if (res?.data?.success) {
        setUserData({
          _id: res?.data?.data?.user?._id,
          email: res?.data?.data?.user?.email,
          name: res?.data?.data?.user?.name,
          token: res?.data?.data?.accessToken,
        });
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (logInData?.success && userData) {
      dispatch(setUser(userData));
      reset();
      toast.success(logInData.message);
      navigate(from, { replace: true });
    } else if (loginError) {
      // toast.error(loginError?.data?.message);
      toast.error('Failed to Login!');
    }
  }, [
    dispatch,
    logInData,
    logInData?.message,
    logInData?.success,
    loginError,
    navigate,
    reset,
    userData,
    from,
  ]);

  return (
    <div className="py-10 md:py-20 px-12 h-full lg:h-[81vh]">
      <h2 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl mb-12">
        Login
      </h2>
      <form
        onSubmit={handleSubmit(handleLogIn)}
        className="w-1/1 md:w-2/3 lg:w-1/3 mx-auto flex flex-col gap-2"
      >
        <div className="form-control w-full flex-row">
          <label className="label items-start w-1/3">
            <span className="text-base font-semibold ">Email:</span>
          </label>
          <div className="w-full">
            <input
              type="email"
              className="input input-bordered w-full focus:outline-none"
              placeholder="Enter your email..."
              {...register('email', { required: 'Email is required' })}
            />
            {/* Display error message */}
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
        </div>
        <div className="form-control w-full flex-row">
          <label className="label items-start w-1/3">
            <span className="text-base font-semibold ">Password:</span>
          </label>
          <div className="w-full">
            <input
              type="password"
              className="input input-bordered w-full focus:outline-none"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message:
                    'Password must be greater than or equal to 6 characters',
                },
              })}
            />
            {/* Display error message */}
            {errors.password && (
              <p className="text-red-600 mt-3">{errors.password?.message}</p>
            )}
          </div>
        </div>
        <button className="w-full btn btn-neutral mt-2" type="submit">
          Login
        </button>
      </form>
      <p className="text-center font-bold text-base md:text-lg mt-4">
        New User? Please,{' '}
        <Link className="underline" to="/signup">
          signup
        </Link>{' '}
        first!
      </p>
    </div>
  );
};

export default Login;
