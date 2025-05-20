import { StyleSheet, Pressable, PressableProps } from "react-native";
import { Colors } from '../constants/Colors';

type ThemedButtonProps = {
  btnStyle?: object
} & PressableProps;

const ThemedButton = ({ btnStyle, ...rest}: ThemedButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, btnStyle]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 6,
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.5
  }
});

export default ThemedButton;