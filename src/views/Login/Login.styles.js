import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
  },
  image: {
    width: 280,
    height: 200,
    marginBottom: 16,
    marginTop: 24,
  },
  inputView: {
    flexDirection: 'row',
    margin: 10,
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#212121',
  },
  textInput: {
    flex: 1,
  },
  textButton: {
    color: '#FFF',
    fontSize: 16,
  },
  textButton2: {
    color: '#212121',
    fontSize: 16,
  },
  forgotButton: {
    height: 30,
    marginBottom: 30,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    height: 50,
    width: '90%',
    marginTop: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D47A1',
  },
  registerButton: {
    height: 50,
    width: '90%',
    marginTop: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
  },
})

export default styles
