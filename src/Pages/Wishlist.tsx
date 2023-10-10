import Card from '@/Components/Card';
import { IBook } from '@/Constants/constants';
import { useAppSelector } from '@/Redux/hooks';

const Wishlist = () => {
  const { wishlist } = useAppSelector((state) => state.books);

  return (
    <div className="py-10 md:py-20 px-12">
      <h2 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl mb-12">
        Wishlist
      </h2>

      {wishlist && wishlist.length > 0 && (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {wishlist &&
            wishlist.length > 0 &&
            wishlist?.map((book: IBook) => (
              <Card key={book._id} isWishlist={true} book={book} />
            ))}
        </div>
      )}

      {wishlist && wishlist.length === 0 && (
        <div className="w-1/1 h-screen">
          <h2 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl">
            Your wishlist is empty❗😞
          </h2>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
