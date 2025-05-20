import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const useUser = () => {
  const context = useContext(UserContext);

  if(!context) throw new Error('useUser must be invoked within UserProvider');

  return context;
};