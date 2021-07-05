import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './List.styles';

const List = ({title, onDelete}) => (
  <TouchableOpacity style={styles.item} onPress={onDelete}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

export default List;
