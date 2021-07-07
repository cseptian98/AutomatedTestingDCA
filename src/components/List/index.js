import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './List.styles';

const List = ({title, onPress, onDelete}) => (
  <View style={styles.listContainer}>
    <TouchableOpacity style={styles.list} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.delete} onPress={onDelete}>
      <Text style={styles.title}>X</Text>
    </TouchableOpacity>
  </View>
);

export default List;
