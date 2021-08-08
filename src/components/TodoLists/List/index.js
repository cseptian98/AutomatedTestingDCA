import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './List.styles'
import {
  TEST_ID_TITLE_TODOLIST,
  TEST_ID_BUTTON_UPDATE_LIST,
  TEST_ID_BUTTON_DELETE_LIST,
} from 'constants'
import { testProps } from 'utils/testProps.helper'

const List = ({title, onPress, onDelete, onUpdate}) => (
  <View style={styles.listContainer}>
    <TouchableOpacity
      onPress={onPress}
      style={styles.list}
      {...testProps(TEST_ID_TITLE_TODOLIST)}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onUpdate}
      style={styles.delete}
      {...testProps(TEST_ID_BUTTON_UPDATE_LIST)}>
      <Icon name="edit" size={24} color="#B71C1C" />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onDelete}
      style={styles.delete}
      {...testProps(TEST_ID_BUTTON_DELETE_LIST)}>
      <Icon name="delete" size={24} color="#B71C1C" />
    </TouchableOpacity>
  </View>
)

export default List
