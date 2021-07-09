import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  BackHandler,
} from 'react-native'
import styles from './Register.styles'
import axiosConfig from 'api/BaseConfig'
import {StackActions} from '@react-navigation/routers'

const Register = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmPassword] = useState('')

  const backAction = () => {
    const movePage = StackActions.push('Login')
    navigation.dispatch(movePage)
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction)
    }
  }, [])

  const doRegister = () => {
    const value = {email, password, confirmationPassword}

    const onSuccess = ({data}) => {
      console.log('debug success', data)
      navigation.replace('Login')
    }

    const onFailure = error => {
      console.log('debug error', error)
      Alert.alert('Error Register', 'Error', [
        {
          text: 'Oke',
          onPress: () => console.log('Cancel'),
        },
      ])
    }

    axiosConfig
      .post('api/Auth/register', value)
      .then(onSuccess)
      .catch(onFailure)
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('assets/images/regis.png')} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#000"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry
          onChangeText={password => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          placeholderTextColor="#000"
          secureTextEntry
          onChangeText={confPassword => setConfirmPassword(confPassword)}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={doRegister}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Register
