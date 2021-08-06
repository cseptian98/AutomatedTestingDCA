import React from 'react'
import {fireEvent, render, waitFor} from '@testing-library/react-native'
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
const replace = jest.fn()
const params = {url: 'api/Auth/register'}

describe('Register Screen', () => {
  beforeEach(() => {
    componentRegister = render(
      <RegisterScreen route={{params}} navigation={{replace}} />,
    )

    email = 'cseptian@gmail.com'
    password = 'Auto@123'
    confirmPassword = 'Auto@123'

    emailInput = componentRegister.getByTestId(TEST_ID_EMAIL_REGISTER)
    passwordInput = componentRegister.getByTestId(TEST_ID_PASSWORD_REGISTER)
    confirmPasswordInput = componentRegister.getByTestId(
      TEST_ID_CONFIRMATION_PASSWORD,
    )
  })
  it('renders correctly', async () => {
    await waitFor(() => {
      const screen = componentRegister.toJSON()
      expect(screen).toMatchSnapshot()
    })
  })
  it('should show register screen', () => {
    expect(componentRegister.getByTestId(TEST_ID_IMAGE_REGISTER)).toBeTruthy()
  })

  it('should change form register', async () => {
    await waitFor(() => {
      fireEvent.changeText(emailInput, email)
      fireEvent.changeText(passwordInput, password)
      fireEvent.changeText(confirmPasswordInput, confirmPassword)
    })
    expect(emailInput.props.value).toBe(email)
    expect(passwordInput.props.value).toBe(password)
    expect(confirmPasswordInput.props.value).toBe(confirmPassword)
  })
})
