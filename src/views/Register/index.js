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
import axiosConfig from 'api/BaseConfig'
import {StackActions} from '@react-navigation/routers'

const Register = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
      Alert.alert('Register Success', 'Your Account Succesfully Registered', [
        {
          text: 'Oke',
          onPress: () => registerSuccess(),
        },
      ])
    }

    const onFailure = error => {
      console.log('debug error', error)
      Alert.alert('Register Error', 'Error Message', [
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

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('assets/images/register.png')}
      />

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

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          placeholderTextColor="#000"
          secureTextEntry
          onChangeText={confPassword => setConfirmPassword(confPassword)}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0D47A1" />
      ) : (
        <>
          <TouchableOpacity style={styles.registerButton} onPress={doRegister}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default Register
