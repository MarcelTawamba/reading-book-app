import { Image, useColorScheme, ViewProps } from 'react-native';

// images
import DarkLogo from '../assets/img/logo_dark.png';
import LightLogo from '../assets/img/logo_light.png';

type ThemedLogoProps = {
  style?: object;
} & ViewProps;

const ThemedLogo = ({ style, ...rest}: ThemedLogoProps) => {
  const colorScheme= useColorScheme();
  const logo = colorScheme === 'dark' ? DarkLogo : LightLogo;

  return (<Image source={logo} {...rest} />);
};

export default ThemedLogo;