import React from 'react'
import {fireEvent, render} from '@testing-library/react-native'
import {User} from 'components'
import {TEST_ID_BUTTON_LOGOUT, TEST_ID_IMAGE_USER} from 'constants'

let componentUser

describe('User Screen', () => {
  beforeEach(() => {
    componentUser = render(<User />)

    buttonLogin = componentUser.getByTestId(TEST_ID_BUTTON_LOGOUT)
  })

  it('should show user screen', () => {
    expect(componentUser.getByTestId(TEST_ID_IMAGE_USER)).toBeTruthy()
  })
})
