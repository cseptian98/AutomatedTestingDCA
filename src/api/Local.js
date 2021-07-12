import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('user', jsonValue)
  } catch (e) {
    console.log('error', e)
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user')
    const value = JSON.parse(jsonValue)
    return jsonValue !== null ? value : null
  } catch (e) {
    console.log('error', e)
  }
}

const deleteData = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    console.log('error', e)
  }
}

export {storeData, getData, deleteData}
