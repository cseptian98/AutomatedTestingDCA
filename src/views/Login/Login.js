import React, {useEffect, useState} from 'react'
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
import {testProps} from 'utils/testProps.helper'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [value, setValue] = useState(null)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)

    const onSuccess = ({data}) => {
      setIsLoading(false)
      storeData(data)
      setToken(data.token)
      navigation.replace('Home')
    }

    const onFailure = () => {
      Alert.alert('Error', 'Login Error', [
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
    const movePage = StackActions.push('Register', {url: 'api/Auth/register'})
    navigation.dispatch(movePage)
  }

  const setIconPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('assets/images/login.png')}
        style={styles.image}
        {...testProps(TEST_ID_IMAGE_LOGIN)}
      />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          keyboardType="email-address"
          onChangeText={value => setEmail(value)}
          placeholder="Email"
          placeholderTextColor="#000"
          style={styles.textInput}
          value={email}
          {...testProps(TEST_ID_EMAIL_LOGIN)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          onChangeText={value => setPassword(value)}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry={showPassword}
          style={styles.textInput}
          value={password}
          {...testProps(TEST_ID_PASSWORD_LOGIN)}
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
            onPress={doLogin}
            style={styles.loginButton}
            {...testProps(TEST_ID_BUTTON_LOGIN)}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toRegister}
            style={styles.registerButton}
            {...testProps(TEST_ID_BUTTON_CREATE_ACCOUNT)}>
            <Text style={styles.textButton2}>Create Account</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default LoginScreen
