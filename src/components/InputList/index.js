import React, {useState} from 'react'
import {View, TextInput, TouchableOpacity, Image} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './InputList.styles'
import axiosConfig from 'api/BaseConfig'

const InputList = ({createList}) => {
  const [title, setTitle] = useState('')

  // const createNewList = () => {
  //   const onSuccess = ({data}) => {
  //     console.log('debug success', data)
  //     setTitle('')
  //   }

  //   const onFailure = error => {
  //     console.log('debug error', error)
  //   }

  //   axiosConfig.post('api/TodoLists', {title}).then(onSuccess).catch(onFailure)
  // }

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require('assets/images/list.png')}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Todo List..."
          placeholderTextColor="#FFF"
          onChangeText={title => setTitle(title)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => createList(title)}>
          <Icon name="add" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default InputList
