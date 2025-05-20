import { createContext, ReactNode, useEffect, useState } from 'react';
import { databases, client } from '../lib/appwrite';
import { ID, Permission, Query, Role, Models } from 'react-native-appwrite';
import { useUser } from '../hooks/useUser';


type BooksContextType = {
  books: any;
  fetchBooks: () => Promise<void>;
  fetchBookById: (id: string) => Promise<void>;
  createBook: (data: Book) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
};

type Book = {
  title: string;
  author: string;
  description: string;
};

 const DATABASE_ID = '682bbd0f00022397269e';
 const COLLECTION_ID = '682bbd4d0027a71b3582';

export const BooksContext = createContext<BooksContextType>({
  books: [],
  fetchBooks: async () => {},
  fetchBookById: async () => {},
  createBook: async () => {},
  deleteBook: async () => {},
});

export const BooksProvider = ({ children } : { children: ReactNode }) => {
  const [books, setBooks] = useState<Models.Document[]>([]);
  const { user } = useUser();

  const fetchBooks = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID, 
        COLLECTION_ID,
        [
          Query.equal('userId', user.$id)
        ]
      );
      setBooks(response.documents);      
    } catch(error: any) {
      console.error(error.message);
    }
  };

  const fetchBookById = async (id: string) => {
    try {

    } catch(error: any) {
      console.error(error.message);
    }
  };

  const createBook = async (data: Book) => {
    try {
      const newBook = await databases.createDocument(
        DATABASE_ID, 
        COLLECTION_ID,
        ID.unique(),
        {...data, userId: user.$id},
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id))
        ]
      );
    } catch(error: any) {
      console.error(error.message);
    }
  };

  const deleteBook = async (id: string) => {
    try {

    } catch(error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    let unsubscribe: any;
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

    if (user) {
      fetchBooks();

      unsubscribe = client.subscribe(channel, (response) => {
        const { payload, events } = response;

        if (events[0].includes('create')) {
          setBooks((previousBooks) => [...previousBooks, payload as Models.Document]);
        }
      });
    } else {
      setBooks([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    }
  }, [user]);

  return (
    <BooksContext.Provider value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}>
      {children}
    </BooksContext.Provider>
  );
};