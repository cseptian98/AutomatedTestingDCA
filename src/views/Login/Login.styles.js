import {StyleSheet} from 'react-native';

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
  textButton: {
    color: '#212121',
  },
  forgotButton: {
    height: 30,
    marginBottom: 30,
  },
  loginButton: {
    height: 50,
    width: '80%',
    marginTop: 20,
    color: '#002F6C',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD500',
  },
  registerButton: {
    height: 50,
    width: '80%',
    marginTop: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eceff1',
  },
});

export default styles;
