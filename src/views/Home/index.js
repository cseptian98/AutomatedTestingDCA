import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import InputTodo from '../../components/InputTodo';
import List from '../../components/List';
import axiosConfig from '../../api/BaseConfig';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getTodoItems();
  }, [])

  const getTodoItems = () => {
    const onSuccess = ({data}) => {
      console.log('debug success', data.lists[0].items);
      setItems(data.lists[0].items);
    };

    const onFailure = error => {
      console.log('debug error', error.response.data);
    };

    axiosConfig.get('api/TodoLists').then(onSuccess).catch(onFailure);
  };

  console.log('debug', items);
  const renderItem = ({item}) => <List title={item.title} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={items => items.id}
      />
      <InputTodo />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default Home;
