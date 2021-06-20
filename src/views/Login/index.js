import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import axiosConfig, {setClientToken} from '../../api/BaseConfig';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);

  const doLogin = () => {
    const value = {email, password};
    console.log('debug input', value);

    const onSuccess = ({data}) => {
      console.log('debug success', data);
      setClientToken(data.token);
      navigation.replace('Home');
    };

    const onFailure = error => {
      console.log('debug error', error.response.data);
    };

    axiosConfig.post('api/Auth/login', value).then(onSuccess).catch(onFailure);
  };

  const doRegister = () => {
    navigation.replace('Register');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/login.png')}
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

      <TouchableOpacity style={styles.loginButton} onPress={doLogin}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={doRegister}>
        <Text>Create Account</Text>
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
    width: 280,
    height: 180,
    marginBottom: 30,
    marginTop: 40,
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
  forgotButton: {
    height: 30,
    marginBottom: 30,
  },
  loginButton: {
    height: 50,
    width: '80%',
    marginTop: 20,
    color: '#212121',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD500',
  },
  registerButton: {
    height: 50,
    width: '80%',
    marginTop: 20,
    color: '#212121',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eceff1',
  },
});

export default Login;
