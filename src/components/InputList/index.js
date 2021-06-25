import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './InputList.styles';
import axiosConfig from '../../api/BaseConfig';

const InputList = () => {
  const [title, setTitle] = useState('');

  const createNewList = () => {
    const onSuccess = ({data}) => {
      console.log('debug success', data);
    };

    const onFailure = error => {
      console.log('debug error', error.response.data);
    };

    axiosConfig.post('api/TodoLists', {title}).then(onSuccess).catch(onFailure);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Todo List..."
          placeholderTextColor="#000"
          onChangeText={title => setTitle(title)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={createNewList}>
        <Icon name="add" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default InputList;
