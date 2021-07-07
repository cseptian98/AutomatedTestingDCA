import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axiosConfig from 'api/BaseConfig';
import styles from './InputItems.styles';

const InputItem = () => {
  const listId = 1;
  const [title, setTitle] = useState('');

  const createNewItem = () => {
    const onSuccess = ({data}) => {
      console.log('debug success', data);
      setTitle('');
    };

    const onFailure = error => {
      console.log('debug error', error);
    };

    axiosConfig
      .post('api/TodoItems', {listId, title})
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Todo Item..."
          placeholderTextColor="#000"
          onChangeText={title => setTitle(title)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={createNewItem}>
        <Icon name="add" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default InputItem;
