/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
  useUpdateSingleBookMutation,
} from '@/Redux/api/apiSlice';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IReview } from '@/Constants/constants';
import { useAppSelector } from '@/Redux/hooks';

const BookDetails = () => {
  const { id } = useParams();

  const { register, handleSubmit, reset } = useForm<IReview>();
  const { user } = useAppSelector((state: { user: any }) => state.user);

  const { data: book, isLoading } = useGetSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const [updateBook, { data: updateBookData, error: updateBookError }] =
    useUpdateSingleBookMutation();

  const [deleteBook, { data: deletedData, error: deletedError }] =
    useDeleteBookMutation();

  // console.log(book?.data);

  const handleDelete = (id: string) => {
    const swalBtn = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalBtn
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteBook(id);
        }
      });
  };

  const handleAddReviews: SubmitHandler<IReview> = async (review) => {
    const newBook = {
      ...book?.data,

      reviews: [...book?.data?.reviews, review],
    };
    const options = {
      id: book?.data?.id,
      data: newBook,
    };

    updateBook(options);
  };

  useEffect(() => {
    if (deletedData?.success) {
      toast.success(deletedData?.message);
    } else if (deletedError) {
      // toast.error(deletedError?.data?.message);
      toast.error('Failed to delte the book!');
    }

    if (updateBookData?.success) {
      toast.success('Successfully added the review😃');
      reset();
    } else if (updateBookError) {
      // toast.error(updateBookError?.data?.message);
      toast.error('Failed to add the review!');
    }
  }, [
    deletedData?.message,
    deletedData?.success,
    deletedError,
    reset,
    updateBookData?.message,
    updateBookData?.success,
    updateBookError,
  ]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-20 px-12">
      <div className="hero">
        <div className="hero-content w-1/1 md:w-[55%] justify-between items-start flex-col lg:flex-row">
          <img
            src={
              'https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/product-8.jpg'
            }
            className="w-96 h-96 rounded-lg shadow-2xl  object-fill"
          />
          <div className="flex flex-col gap-2">
            <p className="text-2xl md:text-3xl font-bold">
              Title: {book?.data.title}
            </p>
            <p className="text-lg lg:text-xl">Author: {book?.data.author}</p>
            <p className="text-lg lg:text-xl">Genre: {book?.data.genre}</p>
            <p className="text-lg lg:text-xl">
              Published: {book?.data.publicationDate}
            </p>
            <div className="w-full flex gap-2">
              <Link to={`/edit/${id}`}>
                <button className="w-full btn btn-neutral">Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(book?.data._id)}
                className="w-1/2 btn btn-neutral"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-12 w-1/2 mx-auto">
        {user?.email && book?.data?.reviews && (
          <form
            className="w-1/1 input-group mb-4"
            onSubmit={handleSubmit(handleAddReviews)}
          >
            <select
              className="select select-bordered focus:outline-none"
              {...register(`rating`, {
                valueAsNumber: true,
                required: 'Rating is required',
              })}
            >
              <option value={0}>Ratings</option>
              <option value={5}>5</option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </select>

            <input
              type="text"
              placeholder="Add a comment..."
              className="input input-bordered w-full focus:outline-none"
              {...register(`reviewText`, {
                required: 'Review is required',
              })}
            />
            <button type="submit" className="btn btn-square btn-neutral">
              Add
            </button>
          </form>
        )}

        <h2 className="text-2xl font-bold">User Reviews</h2>

        {book?.data?.reviews.map((review: IReview, index: number) => (
          <div className="flex gap-4 mt-2" key={index}>
            <h2>User: {book?.data?.seller?.name}</h2>
            <h2>comment: {review.reviewText} </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
