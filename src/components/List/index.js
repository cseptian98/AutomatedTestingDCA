import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './List.styles'

const List = ({title, onPress, onDelete}) => (
  <View style={styles.listContainer}>
    <TouchableOpacity style={styles.list} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.delete} onPress={onDelete}>
      <Icon name="delete" size={24} />
    </TouchableOpacity>
  </View>
)

export default List
