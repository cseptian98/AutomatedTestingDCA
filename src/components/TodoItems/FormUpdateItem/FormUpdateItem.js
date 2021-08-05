import React, {useEffect, useState} from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native'
import styles from './FormUpdateItem.style'
import axiosConfig from 'api/BaseConfig'
import {StackActions, useNavigation, useRoute} from '@react-navigation/native'
import {
  TEST_ID_IMAGE_UPDATE_ITEM,
  TEST_ID_BUTTON_UPDATE_DETAIL,
  TEST_ID_NOTES_ITEM,
} from 'constants'

const FormUpdateItem = () => {
  const route = useRoute()
  const {url, item} = route.params
  const {navigate, dispatch} = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [note, setNote] = useState('')

  const backAction = () => {
    const movePage = StackActions.pop(1)
    dispatch(movePage)
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction)
    }
  }, [])

  const updateItem = () => {
    setIsLoading(true)

    const onSuccess = () => {
      const updateItemSuccess = () => {
        setIsLoading(false)
        navigate('TodoItems')
      }
      Alert.alert('Update Item Success', 'Success', [
        {
          text: 'Oke',
          onPress: () => updateItemSuccess(),
        },
      ])
    }

    const onFailure = error => {
      console.log('Error :', error.response)
      Alert.alert('Update Item Error', 'Error', [
        {
          text: 'Close',
          onPress: () => setIsLoading(false),
        },
      ])
    }

    axiosConfig
      .put(
        url,
        {
          id: item.id,
          listId: item.listId,
          priority: item.priority,
          note: note,
        },
        {params: {id: item.id}},
      )
      .then(onSuccess)
      .catch(onFailure)
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('assets/images/update_item.png')}
        testID={TEST_ID_IMAGE_UPDATE_ITEM}
      />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Note"
          placeholderTextColor="#000"
          keyboardType="email-address"
          value={note}
          testID={TEST_ID_NOTES_ITEM}
          onChangeText={value => setNote(value)}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0D47A1" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={updateItem}
            testID={TEST_ID_BUTTON_UPDATE_DETAIL}>
            <Text style={styles.registerText}>Update Item</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default FormUpdateItem
