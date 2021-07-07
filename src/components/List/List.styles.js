import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  list: {
    flex: 1,
    padding: 10,
    marginLeft: 12,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: '#FFD500',
  },
  title: {
    fontSize: 24,
  },
  delete: {
    color: 'red',
    fontSize: 20,
    marginRight: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default styles;
