import React, {useEffect, useState} from 'react'
import {View, TextInput, TouchableOpacity, Image} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './InputItems.styles'

const InputItem = ({createItem, listId}) => {
  const [title, setTitle] = useState('')

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require('assets/images/item.png')}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Todo Item..."
          placeholderTextColor="#FFF"
          onChangeText={title => setTitle(title)}
        />
        <TouchableOpacity style={styles.button} onPress={() => createItem({listId, title}) }>
          <Icon name="add" size={30} color="#FFF"/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default InputItem
