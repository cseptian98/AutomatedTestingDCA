import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native'
import {StackActions} from '@react-navigation/native'
import styles from './Login.styles'
import axiosConfig, {setToken} from 'api/BaseConfig'
import {storeData, getData} from 'api/Local'

const Login = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    getData().then(value => {
      if (value !== null) {
        setToken(value.token)
        navigation.replace('Home')
      }
    })
  }, [])

  const doLogin = () => {
    const onSuccess = ({data}) => {
      console.log('debug success', data)
      storeData(data)
      setToken(data.token)
      navigation.replace('Home')
    }

    const onFailure = error => {
      console.log('debug error', error)
    }

    axiosConfig
      .post('api/Auth/login', {email, password})
      .then(onSuccess)
      .catch(onFailure)
  }

  const toRegister = () => {
    const movePage = StackActions.push('Register')
    navigation.dispatch(movePage)
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('assets/images/login.png')} />

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

      <TouchableOpacity style={styles.loginButton} onPress={doLogin}>
        <Text style={styles.textButton}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={toRegister}>
        <Text style={styles.textButton}>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login
