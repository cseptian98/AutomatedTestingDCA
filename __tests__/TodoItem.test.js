import React from 'react'
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import {TodoItems} from 'components'
import {
  TEST_ID_IMAGE_TODOITEM,
  TEST_ID_TEXT_INPUT_ITEM,
  TEST_ID_BUTTON_SUBMIT_ITEM,
} from 'constants'

let todoItem
let componentTodoItems
let inputItem
let buttonSubmitItem
const params = {url: 'api/TodoItems'}
const dispatch = jest.fn()

describe('TodoItems screen', () => {
  beforeEach(() => {
    componentTodoItems = render(<TodoItems route={{params}} navigation={{dispatch}}/>)

    todoItem = 'Shoes'

    inputItem = componentTodoItems.getByTestId(TEST_ID_TEXT_INPUT_ITEM)
    buttonSubmitItem = componentTodoItems.getByTestId(
      TEST_ID_BUTTON_SUBMIT_ITEM,
    )
  })

  it('should show todoitems screen', () => {
    expect(componentTodoItems.getByTestId(TEST_ID_IMAGE_TODOITEM)).toBeTruthy()
  })

  it('should change text input value', async () => {
    await waitFor(() => {
      fireEvent.changeText(inputItem, todoItem)
    })
    expect(inputItem.props.value).toBe(todoItem)
  })
})
