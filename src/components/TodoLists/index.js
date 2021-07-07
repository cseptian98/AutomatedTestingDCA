import React, {useState, useLayoutEffect} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import styles from './TodoLists.styles';
import InputList from 'components/InputList';
import List from 'components/List';
import axiosConfig from 'api/BaseConfig';

const TodoLists = ({navigation}) => {
  const [list, setList] = useState([]);

  useLayoutEffect(() => {
    getTodoLists();
  }, []);

  const getTodoLists = () => {
    const onSuccess = ({data}) => {
      console.log('debug success', data);
      setList(data.lists);
    };

    const onFailure = error => {
      console.log('debug error', error);
    };

    axiosConfig.get('api/TodoLists').then(onSuccess).catch(onFailure);
  };

  const moveToItems = item => {
    navigation.navigate('TodoItems', {
      ListId: item.id,
    });
  };

  const deleteList = item => {
    console.log(item.id);

    const onSuccess = () => {
      console.log('debug deleted');
      getTodoLists();
    };

    const onFailure = error => {
      console.log('debug error delete', error);
    };

    axiosConfig
      .delete(`api/TodoLists/${item.id}`)
      .then(onSuccess)
      .catch(onFailure);
  };

  const renderItem = ({item}) => (
    <List title={item.title} onPress={() => moveToItems(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <InputList />
      {list.map(item => {
        return (
          <List
            key={item.id}
            title={item.title}
            onPress={() => moveToItems(item)}
            onDelete={() =>
              Alert.alert('Delete Item', 'Are you sure to delete this item?', [
                {
                  text: 'No',
                  onPress: () => console.log('Cancel'),
                },
                {
                  text: 'Yes',
                  onPress: () => deleteList(item),
                },
              ])
            }
          />
        );
      })}
      {/* <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={list => list.id}
      /> */}
    </SafeAreaView>
  );
};

export default TodoLists;
