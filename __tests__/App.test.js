import {LoginScreen} from 'views'
import renderer from 'react-test-renderer'
import React from 'react'

describe('Testing react navigation', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
