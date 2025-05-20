import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUser } from '../../hooks/useUser';
import GuestOnly from '../../components/auth/GuestOnly';

const AuthLayout = () => {
  const { user } = useUser();
  //console.log(user);

  // wrapping StatusBar inside the Dashboard/layout with the GuestOnly component
  // allows us to protect all the auth screens (login and register)
  // from authenticated/logged-in users. and reroute all logged-in 
  // users to the profile page instead
  // only allowing unauthenticated users to see these screens
  return (
    <GuestOnly>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{ headerShown: false, animation: "none"}}
      />
    </GuestOnly>
  );
};

export default AuthLayout;