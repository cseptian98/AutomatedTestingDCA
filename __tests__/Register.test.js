import React from 'react'
import {fireEvent, render} from '@testing-library/react-native'
import Register from 'views/Register'

let componentRegister

describe('Register Screen', () => {
  beforeEach(() => {
    componentRegister = render(<Register />)
  })

  it('should show register screen', () => {
    expect(componentRegister.getByTestId('imageRegister')).toBeTruthy()
  })
})
