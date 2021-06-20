import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import axiosConfig from '../../api/BaseConfig';

const InputTodo = () => {
  const [title, setTitle] = useState('');

  const doCreate = () => {
    const onSuccess = ({data}) => {
      console.log('debug success', data);
    };

    const onFailure = error => {
      console.log('debug error', error.response.data);
    };

    axiosConfig.post('api/TodoLists', {title}).then(onSuccess).catch(onFailure);
  }

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
      <TouchableOpacity style={styles.button} onPress={doCreate}>
        {/* ICON */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  inputView: {
    borderRadius: 10,
    flexDirection: 'row',
  },
  textInput: {
    width: 300,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFD500',
  },
  button: {
    width: 50,
    marginBottom: 20,
    borderRadius: 50,
    backgroundColor: '#FFD500',
  },
});

export default InputTodo;
