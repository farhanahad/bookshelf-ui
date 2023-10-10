/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBook } from '@/Constants/constants';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { VscDiffAdded } from 'react-icons/vsc';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import {
  addToReadinglist,
  addToWishlist,
  removeFromWishlist,
} from '@/Redux/features/books/bookSlice';
import { useGetSingleBookQuery } from '@/Redux/api/apiSlice';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const Card = ({ book, isWishlist }: { book: IBook; isWishlist?: boolean }) => {
  // console.log(isWishlist);
  const dispatch = useAppDispatch();
  const { data: bookData } = useGetSingleBookQuery(book._id, {
    refetchOnMountOrArgChange: true,
  });

  const { user } = useAppSelector((state: { user: any }) => state.user);

  const [hasErrorDisplayed, setHasErrorDisplayed] = useState(false);

  const handleWishlist = () => {
    if (bookData?.data && !hasErrorDisplayed) {
      dispatch(addToWishlist(bookData.data));
      setHasErrorDisplayed(true);
      toast.success('Successfully added in the wishlist❕');
    }

    if (hasErrorDisplayed) {
      toast.error('Already exists in the wishlist❗');
    }
  };

  const handleAddReadingList = () => {
    if (bookData?.data) {
      dispatch(addToReadinglist(bookData?.data));
      setHasErrorDisplayed(true);
      toast.success('Successfully added in the current reading list❕');
      dispatch(removeFromWishlist(bookData.data));
    }

    if (hasErrorDisplayed) {
      toast.error('Already exists in the reading list❗');
    }
  };

  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(bookData?.data));
    toast.success('Successfully removed from the wishlist❕');
  };

  // const { books: updatedBooks } = useAppSelector((state) => state.books);

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="w-1/2 h-full">
        <img
          src={
            'https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/product-8.jpg'
          }
          alt={book?.title}
        />
      </figure>

      <div className="w-1/2 card-body py-3 px-[10px]">
        {/* <h2 className="card-title break-words	">{book?.title}</h2> */}
        <p className="break-words font-semibold text-base md:text-lg">
          {book?.title}
        </p>
        <span>Author: {book.author}</span>
        <span>Genre: {book.genre}</span>
        <p>Publication Date: {book.publicationDate}</p>
        <div
          className={`card-actions items-center ${
            user?.email ? 'justify-between' : 'justify-end'
          }`}
        >
          {user?.email &&
            (isWishlist ? (
              <div
                className="tooltip tooltip-right"
                data-tip="Add To Reading List"
              >
                <VscDiffAdded
                  className="cursor-pointer"
                  onClick={handleAddReadingList}
                />
              </div>
            ) : (
              <div className="tooltip tooltip-right" data-tip="Wishlist">
                <AiOutlineHeart
                  className="cursor-pointer"
                  onClick={handleWishlist}
                />
              </div>
            ))}

          {isWishlist ? (
            <button
              onClick={handleRemoveFromWishlist}
              className="btn btn-neutral"
            >
              Remove
            </button>
          ) : (
            <Link to={`/details/${book?._id}`}>
              <button className="btn btn-neutral">Details</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
