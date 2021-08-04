import React from 'react'
import {fireEvent, render} from '@testing-library/react-native'
import {RegisterScreen} from 'views'
import {
  TEST_ID_IMAGE_REGISTER,
  TEST_ID_EMAIL_REGISTER,
  TEST_ID_PASSWORD_REGISTER,
  TEST_ID_CONFIRMATION_PASSWORD,
} from 'constants'

let componentRegister
let email
let password
let confirmPassword
let emailInput
let passwordInput
let confirmPasswordInput

describe('Register Screen', () => {
  beforeEach(() => {
    componentRegister = render(<RegisterScreen />)

    email = 'cseptian@gmail.com'
    password = 'Auto@123'
    confirmPassword = 'Auto@123'

    emailInput = componentRegister.getByTestId(TEST_ID_EMAIL_REGISTER)
    passwordInput = componentRegister.getByTestId(TEST_ID_PASSWORD_REGISTER)
    confirmPasswordInput = componentRegister.getByTestId(
      TEST_ID_CONFIRMATION_PASSWORD,
    )
  })

  it('should show register screen', () => {
    expect(componentRegister.getByTestId(TEST_ID_IMAGE_REGISTER)).toBeTruthy()
  })

  it('should change form register', () => {
    fireEvent.changeText(emailInput, email)
    expect(emailInput.props.value).toBe(email)

    fireEvent.changeText(passwordInput, password)
    expect(passwordInput.props.value).toBe(password)

    fireEvent.changeText(confirmPasswordInput, confirmPassword)
    expect(confirmPasswordInput.props.value).toBe(confirmPassword)
  })
})
