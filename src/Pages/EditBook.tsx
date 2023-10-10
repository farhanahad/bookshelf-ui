import {
  useGetSingleBookQuery,
  useUpdateSingleBookMutation,
} from '@/Redux/api/apiSlice';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { format, parse } from 'date-fns';
import { IBook, genres } from '@/Constants/constants';
import { useAppSelector } from '@/Redux/hooks';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const EditBook = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBook>();

  const { user } = useAppSelector((state) => state.user);

  const { data: book, isLoading } = useGetSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const [updateBook, { data: updateBookData, error: updateBookError }] =
    useUpdateSingleBookMutation();

  const handleBookUpdate: SubmitHandler<IBook> = async (data) => {
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
        const processedData = {
          ...data,
          image: base64Result,
          publicationDate: formattedPublicationDate,
          seller: user._id,
        };

        const options = {
          id: book?.data?.id,
          data: processedData,
        };

        updateBook(options);
      };

      reader.readAsDataURL(blob);
    } else {
      const processedData = {
        ...data,
        image: book?.data.image,
        publicationDate: formattedPublicationDate,
        seller: user._id,
      };

      const options = {
        id: book?.data?.id,
        data: processedData,
      };

      updateBook(options);
    }

    // console.log('Update data::', data);
  };

  const formatDate = (inputDate: string) => {
    // Parse the input date in 'dd-MM-yyyy' format
    const dateObject = parse(inputDate, 'dd-MM-yyyy', new Date());
    const parsedDate = format(dateObject, 'yyyy-MM-dd');
    return parsedDate;
  };

  useEffect(() => {
    if (updateBookData?.success) {
      toast.success(updateBookData?.message);
      reset();
    } else if (updateBookError) {
      // toast.error(updateBookError?.data?.message);
      toast.error('Failed to edit the book!');
    }
  }, [reset, updateBookData, updateBookError]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-20 px-12">
      <h2 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl mb-12">
        Edit Book Here
      </h2>
      <form
        onSubmit={handleSubmit(handleBookUpdate)}
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
              // placeholder="Enter author..."
              defaultValue={book?.data.author}
              {...register('author')}
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
              defaultValue={book?.data.title}
              {...register('title')}
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
              name="genre"
            >
              <option defaultValue={book?.data?.genre}>
                {book?.data?.genre}
              </option>
              {genres &&
                genres.length > 0 &&
                genres.map((genre) => (
                  <option key={genre} value={genre} {...register('genre')}>
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
              defaultValue={formatDate(book?.data.publicationDate)}
              {...register('publicationDate')}
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
              // defaultValue={data?.data.image}
              {...register('image')}
            />
            {errors.image && (
              <p className="text-red-600">{errors.image?.message}</p>
            )}
          </div>
        </div>
        <button className="w-full btn btn-neutral mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditBook;
