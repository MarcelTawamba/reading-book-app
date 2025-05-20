import { StyleSheet, useColorScheme, View, ViewProps } from 'react-native';

import { Colors } from '../constants/Colors';

type ThemedCardProps = {
  style?: object;
} & ViewProps;

const ThemedCard = ({ style, ...rest }: ThemedCardProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <View 
      style={[{ backgroundColor: theme.uiBackground}, styles.card, style]}
      {...rest}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20,
  }
});