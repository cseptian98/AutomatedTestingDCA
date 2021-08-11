import AsyncStorage from '@react-native-async-storage/async-storage'
import {storeData, getData} from 'api/Local'

beforeEach(async () => {
  await AsyncStorage.clear()
})

describe('Async Storage', () => {
  test('if no result', async () => {
    const result = await getData()
    expect(result).toEqual(null)
  })

  test('check getData is used', async () => {
    await getData()
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('user')
  })

  test('check storeData is used', async () => {
    const value = {
      user: {
        id: '3a970afe-bd54-4e32-a49f-16592b334478',
        userName: 'cseptian@gmail.com',
        email: 'cseptian@gmail.com',
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjNhOTcwYWZlLWJkNTQtNGUzMi1hNDlmLTE2NTkyYjMzNDQ3OCIsImp0aSI6ImFlNDIzZmMxLTk5N2YtNGM3YS04MGY0LTI2ZmY4ZWQzM2U3ZSIsImV4cCI6MTYzNTk0NTM2MSwiaXNzIjoiVmFsaWRJc3N1ZXIiLCJhdWQiOiJWYWxpZEF1ZGllbmNlIn0.jR6gyyApFyGv6wT-2a8zguB4nMyJ3MQu0RskJj9UnAc',
    }
    await storeData(value)
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1)
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(value))
  })
})
