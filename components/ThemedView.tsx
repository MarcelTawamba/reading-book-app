import { View, ViewProps, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ThemedViewProps = {
  style?: object;
  safe?: boolean;
} & ViewProps; // ViewProps allows us to forward other View props

const ThemedView = ({ style, safe = false, ...rest } : ThemedViewProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  if (!safe) return (
    <View 
      style={[{ backgroundColor: theme.background}, style]}
      {...rest}
     />
  );

  /* 
    returns the top and bottom padding values 
    needed to avoid colliding with devices on 
    the screen sucha as cameras etc...
  */
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[{ 
        backgroundColor: theme.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom 
      }, style]}
      {...rest}
    />
  );
};

export default ThemedView;