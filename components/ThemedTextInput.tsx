import { TextInput, TextInputProps, useColorScheme  } from 'react-native';
import { Colors } from '../constants/Colors';

type ThemedTextInputProps = {
  style?: object;
} & TextInputProps;

const ThemedTextInput = ({ style, ...rest}: ThemedTextInputProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <TextInput
      style={[{
        backgroundColor: theme.uiBackground,
        color: theme.text,
        padding: 20,
        borderRadius: 6
      }, style]}
      placeholderTextColor={theme.text}
      {...rest}
    />
  );
};

export default ThemedTextInput;