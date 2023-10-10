/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBook } from '@/Constants/constants';
import { useUpdateSingleBookMutation } from '@/Redux/api/apiSlice';
import { updateReadingList } from '@/Redux/features/books/bookSlice';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const CurrentlyReading = () => {
  const { readingList } = useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();

  const [updateBook, { data: updateBookData, error: updateBookError }] =
    useUpdateSingleBookMutation();

  const handleChangeStatus = (event: any, book: IBook) => {
    const { value } = event.target;

    const newBookStatus = { ...book, status: value };

    // console.log(newBookStatus);
    const options = {
      id: newBookStatus._id,
      data: newBookStatus,
    };
    dispatch(updateReadingList(newBookStatus));
    updateBook(options);
  };

  useEffect(() => {
    if (updateBookData?.success) {
      toast.success(updateBookData?.message);
    } else if (updateBookError) {
      // toast.error(updateBookError?.data?.message);
      toast.error('Failed to change the status!');
    }
  }, [updateBookData, updateBookError]);

  return (
    <div className="py-10 md:py-20 px-12">
      <h2 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl mb-12">
        Currently Reading
      </h2>

      {readingList && readingList.length > 0 && (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {readingList &&
            readingList.length > 0 &&
            readingList?.map((book: IBook) => (
              <div
                key={book._id}
                className="card card-side bg-base-100 shadow-xl"
              >
                <figure className="w-1/2 h-full">
                  <img
                    className="h-full object-fill"
                    src="http://dummyimage.com/212x100.png/dddddd/000000"
                    alt={book.title}
                  />
                </figure>
                <div className="w-1/2 card-body px-6 py-10">
                  {/* <h2 className="card-title">{book.title}</h2> */}
                  <p className="break-words font-semibold text-base md:text-lg">
                    {book?.title}
                  </p>
                  <p>
                    <span className="font-semibold">Author:</span> {book.author}
                  </p>
                  <p>
                    <span className="font-semibold">Genre:</span> {book.genre}
                  </p>
                  <p>
                    <span className="font-semibold">Publication Date:</span>{' '}
                    {book.publicationDate}
                  </p>
                  <span className="font-semibold">
                    Reading Status:
                    <small className="text-red-500"> {book.status}</small>
                  </span>
                  <select onChange={(event) => handleChangeStatus(event, book)}>
                    <option value="">Change the reading status</option>
                    <option value="Not Started">Not Started</option>
                    <option value="Reading">Reading</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
        </div>
      )}

      {readingList && readingList.length === 0 && (
        <div className="w-1/1 h-screen">
          <h2 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl">
            Your readingL list is empty❗😞
          </h2>
        </div>
      )}
    </div>
  );
};

export default CurrentlyReading;
