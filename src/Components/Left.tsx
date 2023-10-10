import { genres } from '@/Constants/constants';
import { useGetAllBooksQuery } from '@/Redux/api/apiSlice';
import { setBooksSuccess } from '@/Redux/features/books/bookSlice';
import { useAppDispatch } from '@/Redux/hooks';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const Left = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPublicationDate, setSelectedPublicationDate] = useState('');

  const dispatch = useAppDispatch();

  // const { books: updatedBooks } = useAppSelector((state) => state.books);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const handlePublicationDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setSelectedPublicationDate('');
    } else {
      const formattedPublicationDate = format(
        new Date(inputValue),
        'dd-MM-yyyy'
      );
      setSelectedPublicationDate(formattedPublicationDate);
    }
  };

  const { data: books } = useGetAllBooksQuery({
    searchTerm,
    genre: selectedGenre,
    publicationDate: selectedPublicationDate,
  });

  useEffect(() => {
    if (books) {
      dispatch(setBooksSuccess(books?.data));
    }
  }, [books, dispatch]);

  // console.log('Book data', updatedBooks);

  return (
    <div className="w-1/1 md:w-1/3  lg:w-1/4 flex flex-col gap-2">
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered w-full focus:outline-none"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button className="btn btn-square btn-neutral">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <select
        className="select select-bordered focus:outline-none w-full"
        name="genre"
        value={selectedGenre}
        onChange={handleGenreChange}
      >
        <option value="">All Genres</option>
        {genres &&
          genres.length > 0 &&
          genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
      </select>

      <input
        type="date"
        className="input input-bordered w-full focus:outline-none"
        defaultValue={format(new Date(), 'yyyy-MM-dd')}
        onChange={handlePublicationDate}
      />
    </div>
  );
};

export default Left;
