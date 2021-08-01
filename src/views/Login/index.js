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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {storeData, getData} from 'api/Local'
import axiosConfig, {setToken} from 'api/BaseConfig'
import {StackActions} from '@react-navigation/native'
import {
  TEST_ID_IMAGE_LOGIN,
  TEST_ID_EMAIL_LOGIN,
  TEST_ID_PASSWORD_LOGIN,
  TEST_ID_BUTTON_LOGIN,
  TEST_ID_BUTTON_CREATE_ACCOUNT,
} from 'constants'

const Login = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [value, setValue] = useState(null)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(true)

  const readFromStorage = async () => {
    const data = await getData()
    setValue(data)
  }

  useEffect(() => {
    readFromStorage()
  }, [])

  if (value) {
    setToken(value.token)
    navigation.replace('Home')
  }

  const doLogin = () => {
    if (email.length > 0 && password.length > 0) {
      setErrorMessage('Wrong username and password')
    } else {
      setErrorMessage('Email and password is required')
    }
    setIsLoading(true)

    const onSuccess = ({data}) => {
      setIsLoading(false)
      storeData(data)
      setToken(data.token)
      navigation.replace('Home')
    }

    const onFailure = data => {
      console.log('debug error', data)
      Alert.alert('Login Error', errorMessage, [
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

  const setIconPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('assets/images/login.png')}
        testID={TEST_ID_IMAGE_LOGIN}
      />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#000"
          keyboardType="email-address"
          value={email}
          onChangeText={value => setEmail(value)}
          testID={TEST_ID_EMAIL_LOGIN}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry={showPassword}
          value={password}
          onChangeText={value => setPassword(value)}
          testID={TEST_ID_PASSWORD_LOGIN}
        />
        <TouchableOpacity onPress={setIconPassword} style={styles.icon}>
          {showPassword ? (
            <Icon name="eye-off" size={24} color="#000" />
          ) : (
            <Icon name="eye" size={24} color="#000" />
          )}
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0D47A1" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={doLogin}
            testID={TEST_ID_BUTTON_LOGIN}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={toRegister}
            testID={TEST_ID_BUTTON_CREATE_ACCOUNT}>
            <Text style={styles.textButton2}>Create Account</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default Login
