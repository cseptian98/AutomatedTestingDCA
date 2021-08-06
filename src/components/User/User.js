import React, {useState, useEffect} from 'react'
import {View, TouchableOpacity, Text, Alert, Image} from 'react-native'
import {deleteData, getData} from 'api/Local'
import axiosConfig from 'api/BaseConfig'
import styles from './User.styles'
import {TEST_ID_IMAGE_USER, TEST_ID_BUTTON_LOGOUT} from 'constants'

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
        style={styles.image}
        source={require('assets/images/profil.png')}
        testID={TEST_ID_IMAGE_USER}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        testID={TEST_ID_BUTTON_LOGOUT}
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
        }>
        <Text style={styles.textButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default User
