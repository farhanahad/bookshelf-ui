export type Inputs = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  _id: string | null;
  email: string | null;
  name: string | null;
  token: string | null;
};

export type IReview = {
  rating: number;
  reviewText: string;
};

export type IBook = {
  _id?: string;
  image: string | null;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  seller: string | null;
  status?: string | null;
  reviews?: IReview[];
};

export const genres = [
  'Fiction',
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Adventure',
  'Historical Fiction',
  'Biography',
  'Self-Help',
  'Poetry',
  'Comedy',
  'Drama',
  'Young Adult',
  'Graphic Novel',
  'Cookbook',
  'Science',
  'History',
  'Philosophy',
  'Art',
  'Sports',
  'Business',
];

export const BookSearchableFields =
  'title' || 'author' || 'genre' || 'publicationDate';
