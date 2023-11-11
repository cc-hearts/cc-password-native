import {hex_md5} from 'react-native-md5';

export function encodeMd5(str: string) {
  return hex_md5(str);
}
