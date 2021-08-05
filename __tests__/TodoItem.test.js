import React from 'react'
import {fireEvent, render} from '@testing-library/react-native'
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

describe('TodoItems screen', () => {
  beforeEach(() => {
    componentTodoItems = render(<TodoItems />)

    todoItem = 'Shoes'

    inputItem = componentTodoItems.getByTestId(TEST_ID_TEXT_INPUT_ITEM)
    buttonSubmitItem = componentTodoItems.getByTestId(
      TEST_ID_BUTTON_SUBMIT_ITEM,
    )
  })

  it('should show todoitems screen', () => {
    expect(componentTodoItems.getByTestId(TEST_ID_IMAGE_TODOITEM)).toBeTruthy()
  })

  it('should change text input value', () => {
    fireEvent.changeText(inputItem, todoItem)
    expect(inputItem.props.value).toBe(todoItem)
  })
})
