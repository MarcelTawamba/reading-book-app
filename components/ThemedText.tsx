import { Text, useColorScheme, TextProps } from 'react-native';

import { Colors } from '../constants/Colors';

type ThemedTextProps = {
  style?: object;
  title?: boolean;
} & TextProps; // TextProps allows us to forward other Text props

const ThemedText = ({ style, title = false, ...rest }: ThemedTextProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  const textColor = title ? theme.title : theme.text;

  return (
    <Text 
      style={[{ color: textColor}, style]}
      {...rest}
    />
  );
};

export default ThemedText;