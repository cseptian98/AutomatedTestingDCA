import React from 'react'
import {render, waitFor} from '@testing-library/react-native'
import {User} from 'components'
import {TEST_ID_BUTTON_LOGOUT, TEST_ID_IMAGE_USER} from 'constants'

let componentUser
const params = {url: 'api/User'}

describe('User Screen', () => {
  beforeEach(() => {
    componentUser = render(<User route={{params}} />)

    buttonLogout = componentUser.getByTestId(TEST_ID_BUTTON_LOGOUT)
  })
  it('renders correctly', async () => {
    await waitFor(() => {
      const screen = componentUser.toJSON()
      expect(screen).toMatchSnapshot()
    })
  })
  it('should show user screen', () => {
    expect(componentUser.getByTestId(TEST_ID_IMAGE_USER)).toBeTruthy()
  })
})
