import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './List.styles';

const List = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default List;
