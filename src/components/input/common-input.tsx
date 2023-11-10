import {InputModeOptions, TextInput} from 'react-native';
import {isUndef} from '@cc-heart/utils';
import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 8,
    margin: 12,
    width: '100%',
    borderRadius: 4,
  },
});

interface Props {
  type?: InputModeOptions;
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
}

function CommonInput(props: Props): JSX.Element {
  const {type = 'text', placeholder} = props;
  const innerValue = React.useRef<string>('');
  const value = isUndef(props.value) ? innerValue.current : props.value;

  const handleInputChange = (val: string) => {
    innerValue.current = val;
    props.onChange?.(val);
  };

  return (
    <TextInput
      value={value}
      inputMode={type}
      style={styles.input}
      onChangeText={handleInputChange}
      placeholder={placeholder}
    />
  );
}

export default CommonInput;
