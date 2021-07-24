import {fireEvent, render} from '@testing-library/react-native'
import React from 'react'
import Login from 'views/Login'
import AppNavigator from 'views/Navigator/AppNavigator'

describe('Testing react navigation', () => {
  test('renders correctly', async () => {
    const component = (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    )
    let root
    act(() => {
      root = create(component)
    })

    expect(root.getByTestId('txtLogin')).stringContaining('Login')
  })
})
