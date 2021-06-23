import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import List from 'components/List';
import axiosConfig from 'api/BaseConfig';

const TodoItems = () => {
  const ListId = 1;
  const [item, setItem] = useState([]);

  useEffect(() => {
    getTodoItems();
  }, []);

  const getTodoItems = () => {
    const onSuccess = ({data}) => {
      console.log('debug success', data.items);
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

  const renderItem = ({item}) => <List title={item.title} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={item}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default TodoItems;
