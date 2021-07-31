import React from 'react'
import {fireEvent, act, render, waitFor} from '@testing-library/react-native'
import {create} from 'react-test-renderer'
import Login from 'views/Login'

let componentLogin
describe('Login Components', () => {

  beforeEach(() => {
    componentLogin = render(<Login />)
  })
  it('show login screen', () => {
    expect(componentLogin.getByTestId('txtLogin')).toBeTruthy()
  })
})
