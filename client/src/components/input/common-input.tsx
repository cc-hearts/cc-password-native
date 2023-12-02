import {isUndef} from '@cc-heart/utils';
import React from 'react';
import {KeyboardType, StyleSheet, TextInput} from 'react-native';

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
  type?: KeyboardType | 'password';
  placeholder?: string;
  value?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChange?: (val: string) => void;
}

function CommonInput(props: Props): JSX.Element {
  const {type = 'default', placeholder, autoCapitalize = 'none'} = props;
  const innerValue = React.useRef<string>('');
  const value = isUndef(props.value) ? innerValue.current : props.value;

  const secureTextEntry = type === 'password';
  const keyboardType = type === 'password' ? 'default' : type;

  const handleInputChange = (val: string) => {
    innerValue.current = val;
    props.onChange?.(val);
  };

  return (
    <TextInput
      value={value}
      keyboardType={keyboardType}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      onChangeText={handleInputChange}
      placeholder={placeholder}
    />
  );
}

export default CommonInput;
