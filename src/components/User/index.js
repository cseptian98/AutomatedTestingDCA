import React, {useState, useEffect} from 'react'
import {View, TouchableOpacity, Text, Alert, Image} from 'react-native'
import {deleteData, getData} from 'api/Local'
import axiosConfig from 'api/BaseConfig'
import styles from './User.styles'

const User = ({navigation}) => {
  const [id, setId] = useState('')

  useEffect(() => {
    getData().then(value => {
      setId(value.user.id)
    })
  })

  const doLogout = () => {
    const onSuccess = () => {
      deleteData()
      navigation.replace('Login')
    }

    const onFailure = error => {
      console.log('debug error', error)
    }

    axiosConfig.delete(`api/User/${id}`).then(onSuccess).catch(onFailure)
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('assets/images/profil.png')}
      />
      <TouchableOpacity
        style={styles.deleteButton}
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
