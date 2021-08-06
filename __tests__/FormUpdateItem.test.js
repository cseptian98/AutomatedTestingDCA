import React from 'react'
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import {FormUpdateItem} from 'components'
import {
  TEST_ID_IMAGE_UPDATE_ITEM,
  TEST_ID_NOTES_ITEM,
} from 'constants'

let componentFromUpdate
let inputNote
let notes
const params = {url: 'api/TodoItems/UpdateItemDetails'}

describe('From Update Item', () => {
  beforeEach(() => {
    componentFromUpdate = render(<FormUpdateItem route={{params}} />)
    notes = 'Note'
    inputNote = componentFromUpdate.getByTestId(TEST_ID_NOTES_ITEM)
  })
  it('renders correctly', async () => {
    await waitFor(() => {
      const screen = componentFromUpdate.toJSON()
      expect(screen).toMatchSnapshot()
    })
  })
  it('should show form update item screen', () => {
    expect(
      componentFromUpdate.getByTestId(TEST_ID_IMAGE_UPDATE_ITEM),
    ).toBeTruthy()
  })
  it('should change text input value', async () => {
    await waitFor(() => {
      fireEvent.changeText(inputNote, notes)
    })
    expect(inputNote.props.value).toBe(notes)
  })
})
