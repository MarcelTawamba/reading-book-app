import { ReactNode, useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { useRouter } from 'expo-router';
import ThemedLoader from '../ThemedLoader';

const GuestOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

   // whenever any of these values [user, authChecked] changes, 
   // then rerun the code block within the useEffect
  useEffect(() => {
    // if authChecked is true and user is not-null then we are already logged in
    // and we should not be allowed to see the login or register screens anymore
    // thus we should reroute the user to his profile page / screen instead
    if(authChecked && user !== null) {
      router.replace('/profile');
    }
  }, [user, authChecked]);

  if(!authChecked || user) {
    return (<ThemedLoader />);
  }

  return children;
};

export default GuestOnly;