import {useColorScheme} from 'react-native';
import {textStyles} from '../styles/text.styles';

export function useTextStyle() {
  const isDarkMode = useColorScheme();
  return isDarkMode === 'dark' ? textStyles.lightText : textStyles.darkText;
}
