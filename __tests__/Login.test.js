import React from 'react'
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import {LoginScreen} from 'views'
import {
  TEST_ID_IMAGE_LOGIN,
  TEST_ID_EMAIL_LOGIN,
  TEST_ID_PASSWORD_LOGIN,
  TEST_ID_BUTTON_LOGIN,
} from 'constants'
import {TEST_ID_BUTTON_CREATE_ACCOUNT} from 'constants'

let componentLogin
let email
let password
let emailInput
let passwordInput
let buttonLogin
let buttonCreate
const dispatch = jest.fn()
const replace = jest.fn()

describe('Login Components', () => {
  beforeEach(() => {
    componentLogin = render(<LoginScreen navigation={{dispatch, replace}} />)

    email = 'cseptian@gmail.com'
    password = 'Auto@123'

    emailInput = componentLogin.getByTestId(TEST_ID_EMAIL_LOGIN)
    passwordInput = componentLogin.getByTestId(TEST_ID_PASSWORD_LOGIN)
    buttonLogin = componentLogin.getByTestId(TEST_ID_BUTTON_LOGIN)
    buttonCreate = componentLogin.getByTestId(TEST_ID_BUTTON_CREATE_ACCOUNT)
  })

  it('should show login screen', () => {
    expect(componentLogin.getByTestId(TEST_ID_IMAGE_LOGIN)).toBeTruthy()
  })

  it('should changed form login', async () => {
    await waitFor(() => {
      fireEvent.changeText(emailInput, email)
      fireEvent.changeText(passwordInput, password)
    })
    expect(emailInput.props.value).toBe(email)
    expect(passwordInput.props.value).toBe(password)
  })

  it('should move to register screen', async () => {
    await waitFor(() => {
      fireEvent.press(buttonCreate)
    })
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})
