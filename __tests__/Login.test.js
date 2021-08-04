import React from 'react'
import {fireEvent, render} from '@testing-library/react-native'
import {LoginScreen} from 'views'
import {
  TEST_ID_IMAGE_LOGIN,
  TEST_ID_EMAIL_LOGIN,
  TEST_ID_PASSWORD_LOGIN,
  TEST_ID_BUTTON_LOGIN,
} from 'constants'

let componentLogin
let email
let password
let emailInput
let passwordInput
let buttonLogin

describe('Login Components', () => {
  beforeEach(() => {
    componentLogin = render(<LoginScreen />)

    email = 'cseptian@gmail.com'
    password = 'Auto@123'

    emailInput = componentLogin.getByTestId(TEST_ID_EMAIL_LOGIN)
    passwordInput = componentLogin.getByTestId(TEST_ID_PASSWORD_LOGIN)
    buttonLogin = componentLogin.getByTestId(TEST_ID_BUTTON_LOGIN)
  })

  it('should show login screen', () => {
    expect(componentLogin.getByTestId(TEST_ID_IMAGE_LOGIN)).toBeTruthy()
  })

  it('should changed form login', () => {
    fireEvent.changeText(emailInput, email)
    expect(emailInput.props.value).toBe(email)

    fireEvent.changeText(passwordInput, password)
    expect(passwordInput.props.value).toBe(password)

    // fireEvent.press(buttonLogin)
    // expect(doLogin).toHaveBeenCalledTimes(1)
  })
})
