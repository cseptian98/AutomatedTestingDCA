import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Item.styles'

const Item = ({title, onDelete, onUpdate}) => (
  <View style={styles.itemContainer}>
    <View style={styles.item} testID="titleItem">
      <Text style={styles.title}>{title}</Text>
    </View>
    <TouchableOpacity
      style={styles.delete}
      onPress={onUpdate}
      testID="btnUpdateItem">
      <Icon name="update" size={24} color="#B71C1C" />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.delete}
      onPress={onDelete}
      testID="btnDeletItem">
      <Icon name="delete" size={24} color="#B71C1C" />
    </TouchableOpacity>
  </View>
)

export default Item
