import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import 'react-native-gesture-handler/jestSetup'

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

jest.mock('@react-navigation/native', () => {
  const mockedNavigate = jest.fn()
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      dispatch: mockedNavigate,
      navigate: mockedNavigate,
      replace: mockedNavigate,
    }),
    useRoute: () => ({
      params: {
        url: 'fake',
      },
    }),
  }
})

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {}

  return Reanimated
})

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
