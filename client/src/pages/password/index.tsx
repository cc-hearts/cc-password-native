import React, {useContext} from 'react';
import {
  Clipboard,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../../components/card';
import {findPassword, findPasswordList} from '../../features/password/apis';
import {ArrowUp} from '../../icons/arrow-up';
import {Pagination} from '../../typings/request';
import Headers from './headers';
import Copy from '../../icons/copy';
import {AuthContext} from '../../provider/auth-provider';
import CryptoJS from 'crypto-js';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  context: {
    display: 'flex',
    flex: 1,
  },
  containerPrefixIcon: {
    width: 30,
  },
  containerSuffixIcon: {
    width: 40,
  },
  mt4: {
    marginTop: 4,
  },
  passwordContainer: {
    height: '100%',
  },
});

type PasswordItem = any;
const PasswordItem = (props: PasswordItem) => {
  const {profile} = useContext(AuthContext);
  if (!props) {
    return null;
  }

  const handleClick = () => {
    // expand password
  };

  const handleCopy = async () => {
    const security = await findPassword(props.id);
    if (security && profile?.plain) {
      const bytes = CryptoJS.AES.decrypt(security, profile?.plain);
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      Clipboard.setString(plaintext);
    }
  };
  return (
    <Card>
      <TouchableOpacity onPress={handleClick}>
        <View style={styles.container}>
          <View style={styles.containerPrefixIcon}>
            <ArrowUp />
          </View>
          <View style={styles.context}>
            <Text>{props.title}</Text>
            <Text style={styles.mt4}>{props.username}</Text>
          </View>
          <View style={styles.containerSuffixIcon}>
            <TouchableOpacity onPress={handleCopy}>
              <Copy />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

function Password() {
  const [passwordList, setPasswordList] = React.useState<any[]>([]);
  const [pagination, setPagination] = React.useState<Pagination>({
    page: 1,
    size: 10,
  });
  const pageTotal = React.useRef<number>(0);
  const isMore = React.useRef<boolean>(true);
  const isLoading = React.useRef<boolean>(false);

  const getPasswordList = React.useCallback(async () => {
    console.log(isLoading.current);
    if (isLoading.current) {
      return;
    }
    isLoading.current = true;
    try {
      const [total, dataSource] = await findPasswordList({...pagination});
      setPasswordList(prevState => [
        ...dataSource,
        ...(pagination.page === 1 ? [] : prevState),
      ]);
      pageTotal.current = total;
      isMore.current = pagination.page * pagination.size < total;
    } catch (e) {
      console.log(e);
    }
    isLoading.current = false;
  }, [pagination]);

  React.useEffect(() => {
    getPasswordList();
  }, [getPasswordList]);

  const handleReadMore = () => {
    if (isMore.current) {
      setPagination({
        ...pagination,
        page: pagination.page + 1,
      });
    }
  };

  return (
    <View style={styles.passwordContainer}>
      <Headers />
      <FlatList
        data={passwordList}
        renderItem={({item}) => <PasswordItem {...item} key={item.id} />}
        keyExtractor={props => props.id}
        onEndReached={handleReadMore}
      />
    </View>
  );
}

export default Password;
