import {View, Text, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../provider/auth-provider';

const styles = StyleSheet.create({
  container: {
    height: 64,
    display: 'flex',
  },
});
function Headers() {
  const {logout} = useContext(AuthContext);

  // const handleLogout = () => {
  //   logout();
  // };

  return (
    <View style={styles.container}>
      <Text>213</Text>
    </View>
  );
}

export default Headers;
