import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const List = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    color: '#212121',
    borderRadius: 24,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#FFD500',
  },
  title: {
    fontSize: 24,
  },
});

export default List;
