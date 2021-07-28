import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    width: 160,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: 200,
    padding: 10,
    marginLeft: 16,
    marginBottom: 10,
    borderRadius: 10,
    color: '#FFF',
    backgroundColor: '#0D47A1',
  },
  button: {
    width: 200,
    marginLeft: 16,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D47A1',
  },
})

export default styles
