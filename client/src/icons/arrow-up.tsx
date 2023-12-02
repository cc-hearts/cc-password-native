import React from 'react';
import {SvgXml} from 'react-native-svg';
import {useTextStyle} from '../hooks/use-text-style';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z"/></svg>`;

export function ArrowUp() {
  const textStyle = useTextStyle();
  // @ts-ignore
  return <SvgXml xml={xml} style={textStyle} />;
}
