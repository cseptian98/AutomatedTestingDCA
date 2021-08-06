import {LoginScreen, RegisterScreen} from 'views'
import {FormUpdateItem, TodoLists, TodoItems, User} from 'components'
import renderer from 'react-test-renderer'
import React from 'react'
import {waitFor} from '@testing-library/react-native'

describe('Testing', () => {
  describe('Login Screen', () => {
    it('renders correctly', async () => {
      await waitFor(() => {
        const tree = renderer.create(<LoginScreen />).toJSON()
        expect(tree).toMatchSnapshot()
      })
    })
  })
  describe('Register Screen', () => {
    const params = {url: 'api/Auth/register'}
    it('renders correctly', async () => {
      await waitFor(() => {
        const screen = renderer
          .create(<RegisterScreen route={{params}} />)
          .toJSON()
        expect(screen).toMatchSnapshot()
      })
    })
  })
  describe('TodoLists Screen', () => {
    const params = {url: 'api/TodoLists'}
    it('renders correctly', async () => {
      await waitFor(() => {
        const screen = renderer.create(<TodoLists route={{params}} />).toJSON()
        expect(screen).toMatchSnapshot()
      })
    })
  })
  describe('TodoItems Screen', () => {
    const params = {url: 'api/TodoItems'}
    it('renders correctly', async () => {
      await waitFor(() => {
        const screen = renderer.create(<TodoItems route={{params}} />).toJSON()
        expect(screen).toMatchSnapshot()
      })
    })
  })
  describe('Form Update Item Screen', () => {
    const params = {url: 'api/TodoItems/UpdateItemDetails'}
    it('renders correctly', async () => {
      await waitFor(() => {
        const screen = renderer
          .create(<FormUpdateItem route={{params}} />)
          .toJSON()
        expect(screen).toMatchSnapshot()
      })
    })
  })
  describe('User Screen', () => {
    const params = {url: 'api/User'}
    it('renders correctly', async () => {
      await waitFor(() => {
        const screen = renderer.create(<User route={{params}} />).toJSON()
        expect(screen).toMatchSnapshot()
      })
    })
  })
})
