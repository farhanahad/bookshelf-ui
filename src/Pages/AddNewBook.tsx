/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAddNewBookMutation } from '@/Redux/api/apiSlice';
import { useAppSelector } from '@/Redux/hooks';
import { IBook, genres } from '@/Constants/constants';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const AddNewBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBook>();

  const { user } = useAppSelector((state: { user: any }) => state.user);

  const [addNewBook, { data: addBookData, error: addBookError }] =
    useAddNewBookMutation();

  const handleBookPublish: SubmitHandler<IBook> = async (data) => {
    const { image, publicationDate } = data;

    const formattedPublicationDate = format(
      new Date(publicationDate),
      'dd-MM-yyyy'
    );

    if (image && image[0]) {
      const file = image[0];
      const response = await fetch(file);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = () => {
        const base64Result = reader.result ? reader.result.toString() : null;
        const processedData: IBook = {
          ...data,
          image: base64Result,
          publicationDate: formattedPublicationDate,
          seller: user._id,
        };

        addNewBook(processedData);
      };

      reader.readAsDataURL(blob);
    }
  };

  useEffect(() => {
    if (addBookData?.success) {
      toast.success(addBookData.message);
      // console.log('SSs', addBookData);
      reset();
    } else if (addBookError) {
      // console.log('Book rror::', addBookError);
      // toast.error(addBookError?.data?.message);
      toast.error('Failed to add book!');
    }
  }, [
    addBookData,
    addBookData?.message,
    addBookData?.success,
    addBookError,
    reset,
  ]);

  return (
    <div className="py-10 md:py-20 px-12">
      <h2 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl mb-12">
        Let's publish a new book😄
      </h2>

      <form
        onSubmit={handleSubmit(handleBookPublish)}
        className="w-1/1 md:w-[85%] lg:w-1/2 mx-auto flex flex-col gap-2"
      >
        <div className="form-control w-full flex-row">
          <label className="label items-start w-1/3">
            <span className="text-base font-semibold ">Book Author:</span>
          </label>
          <div className="w-full">
            <input
              type="text"
              className="input input-bordered w-full focus:outline-none"
              placeholder="Enter author..."
              {...register('author', {
                required: 'Author is required',
              })}
            />
            {errors.author && (
              <p className="text-red-600">{errors.author?.message}</p>
            )}
          </div>
        </div>
        <div className="form-control w-full flex-row">
          <label className="label items-start w-1/3">
            <span className="text-base font-semibold ">Book Title:</span>
          </label>
          <div className="w-full">
            <input
              type="text"
              className="input input-bordered w-full focus:outline-none"
              placeholder="Enter title..."
              {...register('title', {
                required: 'Title is required',
              })}
            />
            {errors.title && (
              <p className="text-red-600">{errors.title?.message}</p>
            )}
          </div>
        </div>
        <div className="form-control w-full flex-row">
          <label className="label items-start w-1/3">
            <span className="text-base font-semibold ">Genre:</span>
          </label>
          <div className="w-full">
            <select
              className="select select-bordered focus:outline-none w-full"
              {...register('genre', {
                required: 'Genre is required',
              })}
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="text-red-600">{errors.genre?.message}</p>
            )}
          </div>
        </div>
        <div className="form-control w-full flex-row">
          <label className="label items-start w-1/3">
            <span className="text-base font-semibold ">Publication Date:</span>
          </label>
          <div className="w-full">
            <input
              type="date"
              className="input input-bordered w-full focus:outline-none"
              defaultValue={format(new Date(), 'yyyy-MM-dd')}
              {...register('publicationDate', {
                required: 'Publication Date is required',
              })}
            />
            {errors.publicationDate && (
              <p className="text-red-600">{errors.publicationDate?.message}</p>
            )}
          </div>
        </div>
        <div className="form-control w-full flex-row">
          <label className="label items-start w-1/3">
            <span className="text-base font-semibold ">Cover Image:</span>
          </label>
          <div className="w-full">
            <input
              accept="image/*"
              type="file"
              className="file-input input-bordered w-full focus:outline-none"
              {...register('image', {
                required: 'Image is required',
              })}
            />
            {errors.image && (
              <p className="text-red-600">{errors.image?.message}</p>
            )}
          </div>
        </div>
        <button className="w-full btn btn-neutral mt-2" type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddNewBook;
