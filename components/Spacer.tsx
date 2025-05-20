 import { View } from 'react-native';

 type SpacerProps = {
  width?: any;
  height?: any;
 };

 const Spacer = ({ width = "100%", height = 40}: SpacerProps) => {
  return (<View style={{ width, height }} />);
 };

 export default Spacer;