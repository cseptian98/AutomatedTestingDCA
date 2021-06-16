import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

const InputTodo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Todo List..."
          placeholderTextColor="#000"
        />
      </View>
      <TouchableOpacity style={styles.button}>
        {/* ICON */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
