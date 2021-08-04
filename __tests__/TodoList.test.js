import React from 'react'
import {fireEvent, render} from '@testing-library/react-native'
import {TodoLists} from 'components'
import {
  TEST_ID_IMAGE_TODOLIST,
  TEST_ID_TEXT_INPUT_LIST,
  TEST_ID_BUTTON_SUBMIT_LIST,
} from 'constants'

let todoList
let componentTodoLists
let inputList
let buttonSubmitList

describe('Todolists Screen', () => {
  beforeEach(() => {
    componentTodoLists = render(<TodoLists />)

    todoList = 'Running'

    inputList = componentTodoLists.getByTestId(TEST_ID_TEXT_INPUT_LIST)
    buttonSubmitList = componentTodoLists.getByTestId(
      TEST_ID_BUTTON_SUBMIT_LIST,
    )
  })

  it('should show todolist screen', () => {
    expect(componentTodoLists.getByTestId(TEST_ID_IMAGE_TODOLIST)).toBeTruthy()
  })

  it('should change text input value', () => {
    fireEvent.changeText(inputList, todoList)
    expect(inputList.props.value).toBe(todoList)
  });
})
