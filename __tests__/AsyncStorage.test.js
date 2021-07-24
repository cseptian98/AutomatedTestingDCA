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
    
    it('check getData is used', async () => {
        await getData()
        expect(AsyncStorage.getItem).toBeCalledWith('user')
    })

    it('check storeData is used', async () => {
        const value = {user: 'user'}
        await storeData(value)
        expect(AsyncStorage.setItem).toBeCalledWith('user', JSON.stringify(value))
    })
})