import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../../components/button/button';
import CommonInput from '../../components/input/common-input';
import {ILoginParams, fetchLogin} from '../../features/login/apis';

const styles = StyleSheet.create({
  loginContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    width: '80%',
  },
});

function Login(): JSX.Element {
  const [loginForm, setLoginForm] = React.useState({} as ILoginParams);

  const handleLogin = () => {
    fetchLogin({}).then(res => {
      console.log(res);
    });
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginBox}>
        <CommonInput
          placeholder="place enter username"
          value={loginForm.username}
          onChange={e => setLoginForm({...loginForm, username: e})}
        />
        <CommonInput
          value={loginForm.password}
          onChange={e => setLoginForm({...loginForm, password: e})}
        />
        <Button onClick={handleLogin}>登陆</Button>
      </View>
    </View>
  );
}

export {Login};
