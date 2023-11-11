import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import Button from '../../components/button/button';
import {AuthContext} from '../../provider/auth-provider';

function Password() {
  const {logout} = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <View>
      <Text>password</Text>
      <Button onClick={handleLogout}>log out</Button>
    </View>
  );
}

export default Password;
