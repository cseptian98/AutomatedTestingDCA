import Login from 'views/Login'
import renderer from 'react-test-renderer'
import React from 'react'

describe('Testing react navigation', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
