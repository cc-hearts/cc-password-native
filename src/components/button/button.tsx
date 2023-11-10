import React from 'react';
import {GestureResponderEvent, Button as RNButton} from 'react-native';
interface Props {
  onClick?: (event: GestureResponderEvent) => void;
}

const Button = (props: React.PropsWithChildren<Props>) => {
  const btnChildrenSlots = (props.children || '').toString();
  return <RNButton title={btnChildrenSlots} onPress={props.onClick} />;
};

export default Button;
