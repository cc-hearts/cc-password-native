import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import Button from '../../components/button/button';
import {AuthContext} from '../../provider/auth-provider';
import {Pagination} from '../../typings/request';
import {findPasswordList} from '../../features/password/apis';

function Password() {
  const {logout} = useContext(AuthContext);

  const [pagination] = React.useState<Pagination>({
    page: 1,
    size: 10,
  });

  const handleLogout = () => {
    logout();
  };

  const getPasswordList = React.useCallback(async () => {
    const data = await findPasswordList({...pagination});
    // TODO:
    console.log(data);
  }, [pagination]);

  React.useEffect(() => {
    getPasswordList();
  }, [getPasswordList]);

  return (
    <View>
      <Text>password</Text>
      <Button onClick={handleLogout}>log out</Button>
    </View>
  );
}

export default Password;
