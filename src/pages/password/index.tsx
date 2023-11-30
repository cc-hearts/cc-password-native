import React, {useContext} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from '../../components/button/button';
import Card from '../../components/card';
import {findPasswordList} from '../../features/password/apis';
import {ArrowUp} from '../../icons/arrow-up';
import {AuthContext} from '../../provider/auth-provider';
import {Pagination} from '../../typings/request';
import Headers from './headers';
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerPrefixIcon: {
    width: 30,
  },
  containerText: {
    flex: 1,
  },
  containerSuffixIcon: {
    width: 40,
  },
  mt4: {
    marginTop: 4,
  },
});

type PasswordItem = any;
const PasswordItem = (props: PasswordItem) => {
  if (!props) {
    return null;
  }
  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.containerPrefixIcon}>
          <ArrowUp />
        </View>
        <View style={styles.containerText}>
          <Text>{props.title}</Text>
          <Text style={styles.mt4}>{props.username}</Text>
        </View>
        <View style={styles.containerSuffixIcon}>{/* copy icon */}</View>
      </View>
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
    console.log('--------');

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
    // <ScrollView>
    //   {passwordList.map(item => {
    //     return (
    //       <Card key={item.id}>
    //         <View style={styles.container}>
    //           <View style={styles.containerPrefixIcon}>
    //             <ArrowUp />
    //           </View>
    //           <View style={styles.containerText}>
    //             <Text>{item.title}</Text>
    //             <Text style={styles.mt4}>{item.username}</Text>
    //           </View>
    //           <View style={styles.containerSuffixIcon}>{/* copy icon */}</View>
    //         </View>
    //       </Card>
    //     );
    //   })}
    //   <Button onClick={handleLogout}>log out</Button>
    // </ScrollView>
    <View>
      <Headers />
      <FlatList
        style={{height: 80}}
        data={passwordList}
        renderItem={({item}) => <PasswordItem {...item} key={item.id} />}
        keyExtractor={props => props.id}
        onEndReached={handleReadMore}
      />
    </View>
  );
}

export default Password;
