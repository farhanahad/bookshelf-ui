import Card from '@/Components/Card';
import { IBook } from '@/Constants/constants';
import { useGetAllBooksQuery } from '@/Redux/api/apiSlice';

const Home = () => {
  const { data: books, isLoading } = useGetAllBooksQuery({
    refetchOnMountOrArgChange: true,
  });

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
        Feature Books
      </h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {!isLoading &&
          books?.data &&
          books?.data.length > 0 &&
          books?.data
            .slice(0, 10)
            .map((book: IBook) => <Card key={book._id} book={book} />)}
      </div>
    </div>
  );
};

export default Home;
