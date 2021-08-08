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
import {StackActions} from '@react-navigation/native'
import {
  TEST_ID_IMAGE_REGISTER,
  TEST_ID_EMAIL_REGISTER,
  TEST_ID_PASSWORD_REGISTER,
  TEST_ID_CONFIRMATION_PASSWORD,
  TEST_ID_BUTTON_REGISTER,
} from 'constants'
import {testProps} from 'utils/testProps.helper'

const RegisterScreen = ({route, navigation}) => {
  const {url} = route.params
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const [showConfPassword, setShowConfPassword] = useState(true)

  const backAction = () => {
    const movePage = StackActions.pop(1)
    navigation.dispatch(movePage)
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction)
    }
  }, [])

  const doRegister = () => {
    const value = {email, password, confirmationPassword}
    setIsLoading(true)

    const onSuccess = () => {
      const registerSuccess = () => {
        setIsLoading(false)
        navigation.replace('Login')
      }
      Alert.alert('Success', 'Your Account Succesfully Registered', [
        {
          text: 'Oke',
          onPress: () => registerSuccess(),
        },
      ])
    }

    const onFailure = () => {
      Alert.alert('Error', 'Register Error', [
        {
          text: 'Close',
          onPress: () => setIsLoading(false),
        },
      ])
    }

    axiosConfig.post(url, value).then(onSuccess).catch(onFailure)
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
        source={require('assets/images/register.png')}
        style={styles.image}
        {...testProps(TEST_ID_IMAGE_REGISTER)}
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
          {...testProps(TEST_ID_EMAIL_REGISTER)}
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
          {...testProps(TEST_ID_PASSWORD_REGISTER)}
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
          onChangeText={value => setConfirmPassword(value)}
          placeholder="Confirmation Password"
          placeholderTextColor="#000"
          secureTextEntry={showConfPassword}
          style={styles.textInput}
          value={confirmationPassword}
          {...testProps(TEST_ID_CONFIRMATION_PASSWORD)}
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
            onPress={doRegister}
            style={styles.registerButton}
            {...testProps(TEST_ID_BUTTON_REGISTER)}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default RegisterScreen
