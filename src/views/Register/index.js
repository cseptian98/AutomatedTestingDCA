import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  BackHandler
} from 'react-native';
import axiosConfig from 'api/BaseConfig';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmPassword] = useState('');

  const backAction = () => {
    navigation.replace('Login');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const doRegister = () => {
    const value = {email, password, confirmationPassword};
    console.log('debug input', value);

    const onSuccess = ({data}) => {
      console.log('debug success', data);
      navigation.replace('Login');
    };

    const onFailure = error => {
      console.log('debug error', error.response.data);
    };

    axiosConfig.post('api/Auth/register', value).then(onSuccess).catch(onFailure);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/regis.png')}
      />

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
  },
  image: {
    width: 240,
    height: 200,
    marginBottom: 30,
    marginTop: 30,
  },
  inputView: {
    height: 45,
    width: '80%',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  textInput: {
    flex: 1,
    height: 30,
  },
  registerButton: {
    height: 50,
    width: '80%',
    marginTop: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eceff1',
  },
});

export default Register;
