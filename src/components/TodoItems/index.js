import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, Alert} from 'react-native';
import styles from './TodoItems.styles';
import List from 'components/List';
import InputItem from 'components/InputItem';
import axiosConfig from 'api/BaseConfig';

const TodoItems = () => {
  const ListId = 1;
  const [item, setItem] = useState([]);

  useEffect(() => {
    getTodoItems();
  }, []);

  const getTodoItems = () => {
    const onSuccess = ({data}) => {
      setItem(data.items);
    };

    const onFailure = error => {
      console.log('debug error', error.response.data);
    };

    axiosConfig
      .get('api/TodoItems', {params: {ListId}})
      .then(onSuccess)
      .catch(onFailure);
  };

  const deleteItems = item => {
    console.log(item.id);

    const onSuccess = () => {
      console.log('debug deleted');
      getTodoItems();
    };

    const onFailure = error => {
      console.log('debug error delete', error);
    };

    axiosConfig
      .delete(`api/TodoItems/${item.id}`)
      .then(onSuccess)
      .catch(onFailure);
  };

  const renderItem = ({item}) => (
    <List
      title={item.title}
      onDelete={() =>
        Alert.alert('Delete Item', 'Are you sure to delete this item?', [
          {
            text: 'No',
            onPress: () => console.log('Cancel'),
          },
          {
            text: 'Yes',
            onPress: () => deleteItems(item),
          },
        ])
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={item}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <InputItem />
    </SafeAreaView>
  );
};

export default TodoItems;
