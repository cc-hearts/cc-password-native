import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  card: {
    margin: 12,
    marginTop: 6,
    borderRadius: 6,
    marginButton: 6,
    padding: 8,
    backgroundColor: '#fff',
  },
});

function Card(props: PropsWithChildren) {
  return <View style={styles.card}>{props.children}</View>;
}

export default Card;
