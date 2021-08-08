import React, {useState, useEffect} from 'react'
import {View, TouchableOpacity, Text, Alert, Image} from 'react-native'
import {deleteData, getData} from 'api/Local'
import axiosConfig from 'api/BaseConfig'
import styles from './User.styles'
import {TEST_ID_IMAGE_USER, TEST_ID_BUTTON_LOGOUT} from 'constants'
import { testProps } from 'utils/testProps.helper'

const User = ({route, navigation}) => {
  const [id, setId] = useState('')
  const {url} = route.params

  const readIdFromStorage = async () => {
    const value = await getData()
    setId(value.user.id)
  }

  useEffect(() => {
    readIdFromStorage()
  }, [])

  const doLogout = () => {
    const onSuccess = () => {
      deleteData()
      navigation.replace('Login')
    }

    axiosConfig.delete(`${url}/${id}`).then(onSuccess)
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('assets/images/profil.png')}
        style={styles.image}
        {...testProps(TEST_ID_IMAGE_USER)}
      />
      <TouchableOpacity
        onPress={() =>
          Alert.alert('Logout', 'Are you sure to Logout?', [
            {
              text: 'Yes',
              onPress: () => doLogout(),
            },
            {
              text: 'No',
              onPress: () => console.log('Cancel'),
            },
          ])
        }
        style={styles.deleteButton}
        {...testProps(TEST_ID_BUTTON_LOGOUT)}
        >
        <Text style={styles.textButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default User
