import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { useSignUpMutation } from '@/Redux/api/apiSlice';
import { Inputs } from '@/Constants/constants';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const [signUp, { data: signUpData, error: signUpError }] =
    useSignUpMutation();

  const handleSignUp: SubmitHandler<Inputs> = (data) => {
    signUp(data);
  };

  useEffect(() => {
    if (signUpData?.success) {
      toast.success(signUpData.message);
      reset();
      navigate('/login');
    } else if (signUpError) {
      // toast.error(signUpError?.data.message);
      toast.error('Failed to signup!');
    }
  }, [reset, navigate, signUpData?.message, signUpData?.success, signUpError]);

  return (
    <div className="py-10 md:py-[86px] px-12">
      <h2 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl mb-12">
        SignUp
      </h2>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="w-1/1 md:w-2/3 lg:w-1/3 mx-auto flex flex-col gap-2"
      >
        <div className="form-control w-full flex-row">
          <label className="label items-start w-1/3">
            <span className="text-base font-semibold">Name:</span>
          </label>
          <div className="w-full">
            <input
              type="text"
              className="input input-bordered w-full focus:outline-none"
              placeholder="Enter your name..."
              {...register('name', { required: 'Name is required' })}
            />
            {/* Display error message */}
            {errors.name && (
              <p className="text-red-600">{errors.name?.message}</p>
            )}
          </div>
        </div>
        <div className="form-control w-full flex-row">
          <label className="label items-start w-1/3">
            <span className="text-base font-semibold">Email:</span>
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
            <span className="text-base font-semibold">Password:</span>
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
        Already have an account? Please,{' '}
        <Link className="underline" to="/login">
          Login
        </Link>{' '}
        here!
      </p>
    </div>
  );
};

export default SignUp;
