import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import UserOnly from '../../components/auth/UserOnly';

const DashLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  // wrapping Tabs inside the Dashboard/layout with the UserOnly component
  // allows us to protect all the dashboard's screens
  // from unauthenticated/logged-out users.
  // only allow authenticated users to see these screens
  return (
    <UserOnly>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle:  {
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 90,
          },
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor: theme.iconColor
        }}
      >
        <Tabs.Screen
          name='profile'
          options={{ 
            title : 'Profile',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'person' : 'person-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
          )}}
        /> 

        <Tabs.Screen
          name='books' 
          options={{ 
            title : 'Books',
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                size={24}
                name={focused ? 'book' : 'book-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
          )}} 
        />

        <Tabs.Screen
          name='create'
          options={{
            title : 'Create',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'create' : 'create-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
          )}}
        />
      </Tabs>
    </UserOnly>
  );
};

export default DashLayout;