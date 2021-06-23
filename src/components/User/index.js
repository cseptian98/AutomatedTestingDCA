import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import InputList from 'components/Input';

const User = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.textButton}>Delete User</Text>
      </TouchableOpacity>
      <InputList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: '#FFF',
  },
  deleteButton: {
    height: 50,
    width: '80%',
    marginTop: 20,
    color: '#000',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C62828',
  },
});

export default User;
