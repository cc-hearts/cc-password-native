import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../../components/button/button';
import CommonInput from '../../components/input/common-input';
import {ILoginParams, fetchLogin} from '../../features/login/apis';
import {encodeMd5} from '../../utils/crypto';
import {setRefreshToken, setToken} from '../../utils/storage';

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
    const params = {
      ...loginForm,
      password: encodeMd5(loginForm.password),
    };
    fetchLogin(params).then(data => {
      if (data) {
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        console.log('登陆成功');
      }
    });
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginBox}>
        <CommonInput
          value={loginForm.username}
          placeholder="place enter username"
          onChange={e => setLoginForm({...loginForm, username: e})}
        />
        <CommonInput
          value={loginForm.password}
          type="password"
          placeholder="place enter password"
          onChange={e => setLoginForm({...loginForm, password: e})}
        />
        <Button onClick={handleLogin}>登陆</Button>
      </View>
    </View>
  );
}

export {Login};
