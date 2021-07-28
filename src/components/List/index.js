import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './List.styles'

const List = ({title, onPress, onDelete, onUpdate}) => (
  <View style={styles.listContainer}>
    <TouchableOpacity
      style={styles.list}
      onPress={onPress}
      testID="btnTitleList">
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.delete}
      onPress={onUpdate}
      testID="btnUpdateList">
      <Icon name="update" size={24} color="#B71C1C" />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.delete}
      onPress={onDelete}
      testID="btnDeletList">
      <Icon name="delete" size={24} color="#B71C1C" />
    </TouchableOpacity>
  </View>
)

export default List
