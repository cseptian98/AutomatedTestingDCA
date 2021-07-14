import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  list: {
    flex: 1,
    padding: 12,
    marginLeft: 12,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: '#0D47A1',
  },
  title: {
    fontSize: 24,
    color: '#FFF',
  },
  delete: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default styles
