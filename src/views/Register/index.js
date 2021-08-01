import React, {useState, useEffect} from 'react'
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
import {StackActions} from '@react-navigation/routers'

const Register = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
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
    if(password !== confirmationPassword) {
      setErrorMessage('Confirmation Password must same with Password')
    }
    const value = {email, password, confirmationPassword}
    setIsLoading(true)

    const onSuccess = () => {
      const registerSuccess = () => {
        setIsLoading(false)
        navigation.replace('Login')
      }
      Alert.alert('Register Success', 'Your Account Succesfully Registered', [
        {
          text: 'Oke',
          onPress: () => registerSuccess(),
        },
      ])
    }

    const onFailure = error => {
      console.log('debug error', error)
      Alert.alert('Register Error', errorMessage, [
        {
          text: 'Close',
          onPress: () => setIsLoading(false),
        },
      ])
    }

    axiosConfig
      .post('api/Auth/register', value)
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
        testID="imageRegister"
      />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#000"
          keyboardType="email-address"
          value={email}
          testID='emailRegister'
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry={showPassword}
          value={password}
          testID='passwordRegister'
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity onPress={setIconPassword} style={styles.icon}>
          {showPassword ? (
            <Icon name='eye-off' size={24} color="#000" />
          ) : (
            <Icon name='eye' size={24} color="#000" />
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
          testID='confirmPassword'
          onChangeText={(value) => setConfirmPassword(value)}
        />
        <TouchableOpacity onPress={setIconConfPassword} style={styles.icon}>
          {showConfPassword ? (
            <Icon name='eye-off' size={24} color="#000" />
          ) : (
            <Icon name='eye' size={24} color="#000" />
          )}
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0D47A1" />
      ) : (
        <>
          <TouchableOpacity style={styles.registerButton} onPress={doRegister} testID='btnRegister'>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default Register
