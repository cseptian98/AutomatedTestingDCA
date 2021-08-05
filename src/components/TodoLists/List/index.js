import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './List.styles'
import {
  TEST_ID_TITLE_TODOLIST,
  TEST_ID_BUTTON_UPDATE_LIST,
  TEST_ID_BUTTON_DELETE_LIST,
} from 'constants'

const List = ({title, onPress, onDelete, onUpdate}) => (
  <View style={styles.listContainer}>
    <TouchableOpacity
      style={styles.list}
      onPress={onPress}
      testID={TEST_ID_TITLE_TODOLIST}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.delete}
      onPress={onUpdate}
      testID={TEST_ID_BUTTON_UPDATE_LIST}>
      <Icon name="edit" size={24} color="#B71C1C" />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.delete}
      onPress={onDelete}
      testID={TEST_ID_BUTTON_DELETE_LIST}>
      <Icon name="delete" size={24} color="#B71C1C" />
    </TouchableOpacity>
  </View>
)

export default List
