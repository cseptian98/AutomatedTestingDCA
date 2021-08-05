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
import styles from './Register.styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axiosConfig from 'api/BaseConfig'
import {StackActions, useNavigation, useRoute} from '@react-navigation/native'
import {
  TEST_ID_IMAGE_REGISTER,
  TEST_ID_EMAIL_REGISTER,
  TEST_ID_PASSWORD_REGISTER,
  TEST_ID_CONFIRMATION_PASSWORD,
  TEST_ID_BUTTON_REGISTER,
} from 'constants'

const RegisterScreen = () => {
  const route = useRoute()
  const {url} = route.params
  const {replace, dispatch} = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const [showConfPassword, setShowConfPassword] = useState(true)

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

  const doRegister = () => {
    if (password !== confirmationPassword) {
      setErrorMessage('Confirmation Password must same with Password')
    }
    const value = {email, password, confirmationPassword}
    setIsLoading(true)

    const onSuccess = () => {
      const registerSuccess = () => {
        setIsLoading(false)
        replace('Login')
      }
      Alert.alert('Register Success', 'Your Account Succesfully Registered', [
        {
          text: 'Oke',
          onPress: () => registerSuccess(),
        },
      ])
    }

    const onFailure = error => {
      console.log('Error :', error)
      Alert.alert('Register Error', errorMessage, [
        {
          text: 'Close',
          onPress: () => setIsLoading(false),
        },
      ])
    }

    axiosConfig
      .post(url, value)
      .then(onSuccess)
      .catch(onFailure)
  }

  const setIconPassword = () => {
    setShowPassword(!showPassword)
  }

  const setIconConfPassword = () => {
    setShowConfPassword(!showConfPassword)
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('assets/images/register.png')}
        testID={TEST_ID_IMAGE_REGISTER}
      />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#000"
          keyboardType="email-address"
          value={email}
          testID={TEST_ID_EMAIL_REGISTER}
          onChangeText={value => setEmail(value)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry={showPassword}
          value={password}
          testID={TEST_ID_PASSWORD_REGISTER}
          onChangeText={value => setPassword(value)}
        />
        <TouchableOpacity onPress={setIconPassword} style={styles.icon}>
          {showPassword ? (
            <Icon name="eye-off" size={24} color="#000" />
          ) : (
            <Icon name="eye" size={24} color="#000" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Confirmation Password"
          placeholderTextColor="#000"
          secureTextEntry={showConfPassword}
          value={confirmationPassword}
          testID={TEST_ID_CONFIRMATION_PASSWORD}
          onChangeText={value => setConfirmPassword(value)}
        />
        <TouchableOpacity onPress={setIconConfPassword} style={styles.icon}>
          {showConfPassword ? (
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
            style={styles.registerButton}
            onPress={doRegister}
            testID={TEST_ID_BUTTON_REGISTER}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default RegisterScreen
