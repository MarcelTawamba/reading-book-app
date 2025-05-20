import { ReactNode, useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { useRouter } from 'expo-router';
import ThemedLoader from '../ThemedLoader';

const UserOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

   // whenever any of these values [user, authChecked] changes, 
   // then rerun the code block within the useEffect
  useEffect(() => {
    // if authChecked is true and user is null then we are logged out
    // and need to be logged in. so reroute to the login page
    if(authChecked && user === null) {
      router.replace('/login');
    }
  }, [user, authChecked]);

  if(!authChecked || !user) {
    return (<ThemedLoader />);
  }

  return children;
};

export default UserOnly;