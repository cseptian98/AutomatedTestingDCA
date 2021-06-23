import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import InputList from 'components/Input';
import List from 'components/List';
import axiosConfig from 'api/BaseConfig';

const TodoLists = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getTodoLists();
  }, [])

  const getTodoLists = () => {
    const onSuccess = ({data}) => {
      console.log('debug success', data);
      setList(data.lists);
    };

    const onFailure = error => {
      console.log('debug error', error.response.data);
    };

    axiosConfig.get('api/TodoLists').then(onSuccess).catch(onFailure);
  };
  
  const renderItem = ({item}) => <List title={item.title} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={list => list.id}
      />
      <InputList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default TodoLists;
