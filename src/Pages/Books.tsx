import Card from '@/Components/Card';
import Left from '@/Components/Left';
import { IBook } from '@/Constants/constants';
import { useAppSelector } from '@/Redux/hooks';

const Books = () => {
  const { books: updatedBooks, isLoading } = useAppSelector(
    (state) => state.books
  );

  return (
    <div className="w-full py-10 md:py-20 px-12 ">
      <h2 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl mb-12">
        All Books
      </h2>
      <div className="flex flex-col md:flex-row gap-12">
        <Left />
        {!isLoading && updatedBooks && updatedBooks?.length > 0 && (
          <div className="w-1/1 md:w-2/3 lg:w-3/4 grid gap-8 grid-cols-1 lg:grid-cols-2">
            {updatedBooks?.map((book: IBook, index: number) => (
              <Card key={index} book={book} />
            ))}
          </div>
        )}

        {!isLoading && updatedBooks && updatedBooks?.length === 0 && (
          <div className="w-1/1 md:w-2/3 lg:w-3/4 h-screen">
            <h2 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl">
              Didn't find any books❗😞
            </h2>
          </div>
        )}

        {isLoading && (
          <div className="w-1/1 md:w-2/3 lg:w-3/4 h-screen flex items-start justify-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
