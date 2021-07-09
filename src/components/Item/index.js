import React from 'react'
import {TouchableOpacity, Text} from 'react-native'
import styles from './Item.styles'

const Item = ({title, onDelete}) => (
  <TouchableOpacity style={styles.item} onPress={onDelete}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
)

export default Item
