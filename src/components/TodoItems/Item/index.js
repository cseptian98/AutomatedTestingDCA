import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Item.styles'
import {
  TEST_ID_BUTTON_DELETE_ITEM,
  TEST_ID_BUTTON_UPDATE_ITEM,
  TEST_ID_TITLE_TODOITEM,
} from 'constants'

const Item = ({title, onDelete, onUpdate, onUpdateItem}) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity
      style={styles.item}
      testID={TEST_ID_TITLE_TODOITEM}
      onPress={onUpdateItem}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.delete}
      onPress={onUpdate}
      testID={TEST_ID_BUTTON_UPDATE_ITEM}>
      <Icon name="edit" size={24} color="#B71C1C" />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.delete}
      onPress={onDelete}
      testID={TEST_ID_BUTTON_DELETE_ITEM}>
      <Icon name="delete" size={24} color="#B71C1C" />
    </TouchableOpacity>
  </View>
)

export default Item
