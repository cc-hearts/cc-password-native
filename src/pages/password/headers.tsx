import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../../components/button/button';
import {AuthContext} from '../../provider/auth-provider';

const styles = StyleSheet.create({
  container: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
});
function Headers() {
  const {logout, profile} = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <Text>{profile?.username}</Text>
      <Button onClick={handleLogout}>log out</Button>
    </View>
  );
}

export default Headers;
