import React from 'react'
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import {NavigationContainer} from '@react-navigation/native'
import AppNavigator from 'views/Navigator/AppNavigator'
import Login from 'views/Login'

describe('Login', () => {
  it('test execution', async () => {
    const component = (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
    const root = await waitFor(() => {
      render(<Login />)
    })
    const {getByTestId} = root
    fireEvent.changeText(getByTestId('email'), 'cseptian@gmail.com')
    fireEvent.changeText(getByTestId('password'), 'Auto@123')

    // fireEvent.press(getByText('Login'))
    // expect(onPressMock).toHaveBeenCalled()

    // expect(getByTestId('email')).stringContaining('cseptian@gmail.com')
    // expect(getByTestId('password')).stringContaining('Auto@123')
  })
})
