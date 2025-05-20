import { createContext, ReactNode, useEffect, useState } from 'react';
import { ID, Models } from 'react-native-appwrite';
import { account } from '../lib/appwrite';

type UserContextType = {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  authChecked: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  authChecked: false,
});

export const UserProvider = ({ children } : { children : ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password); //log the user in by creating a session
      const response = await account.get(); // return the user account
      setUser(response);
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password); // create a new user account
      await login(email, password); // then log the user in immediately
    } catch(error: any) {
      throw Error(error.message)
    }
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const getInitialUserValue = async () => {
    try {
      const response = await account.get();
      // if response is null then user not logged or session was deleted/logged out
      // if response is non null then user is logged in.
      setUser(response);
    } catch (error: any) {
      setUser(null);
    } finally {
      // whether user is logged in or not
      // this sets the authCheck state value to indicate that a user/session's 
      // existence was inquired and this the value of user is accurate after this value is settled
      setAuthChecked(true);
    }
  };

   // the empty dependency list means this useEffect block 
   // will only run once when the component is rendered.
   // if we add a variable in that list, then every time the variable
   // is updated, the useEffect block will fire.
  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, register, logout, authChecked }}>
      {children}
    </UserContext.Provider>
  );
};