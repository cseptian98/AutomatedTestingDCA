import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import InputList from 'components/InputList';
import styles from './User.styles';

const User = ({navigation}) => {
  const deleteUser = () => {
    navigation.replace('Login');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.deleteButton} onPress={deleteUser}>
        <Text style={styles.textButton}>Delete User</Text>
      </TouchableOpacity>
      <InputList />
    </View>
  );
};

export default User;
