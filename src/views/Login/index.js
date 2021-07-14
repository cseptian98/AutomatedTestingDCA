import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native'
import styles from './Login.styles'
import {storeData, getData} from 'api/Local'
import axiosConfig, {setToken} from 'api/BaseConfig'
import {StackActions} from '@react-navigation/native'

const Login = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [value, setValue] = useState(null)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const readFromStorage = async () => {
    const data = await getData()
    setValue(data)
  }

  useEffect(() => {
    readFromStorage()
  }, [])

  if(value) {
    setToken(value.token)
    navigation.replace('Home')
  }

  const doLogin = () => {
    setIsLoading(true)
    const onSuccess = ({data}) => {
      setIsLoading(false)
      storeData(data)
      setToken(data.token)
      navigation.replace('Home')
    }

    const onFailure = data => {
      console.log('debug error', data)
      Alert.alert('Login Error', 'Error Message', [
        {
          text: 'Close',
          onPress: () => setIsLoading(false),
        },
      ])
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
          keyboardType="email-address"
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
      {isLoading ? (
        <ActivityIndicator size="large" color="#0D47A1" />
      ) : (
        <>
          <TouchableOpacity style={styles.loginButton} onPress={doLogin}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={toRegister}>
            <Text style={styles.textButton2}>Create Account</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default Login
