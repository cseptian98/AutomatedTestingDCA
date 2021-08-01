import React from 'react'
import {fireEvent, render} from '@testing-library/react-native'
import Login from 'views/Login'
import {
  TEST_ID_IMAGE_LOGIN,
  TEST_ID_EMAIL_LOGIN,
  TEST_ID_PASSWORD_LOGIN,
  TEST_ID_BUTTON_LOGIN,
} from 'constants'

let componentLogin
const doLogin = jest.fn()

describe('Login Components', () => {
  beforeEach(() => {
    componentLogin = render(<Login doLogin={doLogin} />)
  })

  it('should show login screen', () => {
    expect(componentLogin.getByTestId(TEST_ID_IMAGE_LOGIN)).toBeTruthy()
  })

  it('should changed form value', () => {
    const email = 'cseptian@gmail.com'
    const password = 'Auto@123'

    const emailInput = componentLogin.getByTestId(TEST_ID_EMAIL_LOGIN)
    const passwordInput = componentLogin.getByTestId(TEST_ID_PASSWORD_LOGIN)
    const buttonLogin = componentLogin.getByTestId(TEST_ID_BUTTON_LOGIN)

    fireEvent.changeText(emailInput, email)
    expect(emailInput.props.value).toBe(email)

    fireEvent.changeText(passwordInput, password)
    expect(passwordInput.props.value).toBe(password)

    // fireEvent.press(buttonLogin)
    // expect(doLogin).toHaveBeenCalledTimes(1)
  })
})
