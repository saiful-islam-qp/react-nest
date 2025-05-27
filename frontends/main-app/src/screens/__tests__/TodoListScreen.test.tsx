import {screen} from '@testing-library/dom'
import {App} from '../../App'
import {testUtil} from '../../tests/testUtil'
import userEvent from '@testing-library/user-event'

describe('TodoListScreen', () => {
  test('Initially a user should see welcome screen with create todo button', async () => {
    await testUtil.renderWithRoute(<App />, {route: '/'})

    screen.getByText('Welcome to the Todo App')
    const createTodoButton = screen.getByRole('button', {name: /create todo/i})

    await userEvent.click(createTodoButton)

    screen.getByRole('dialog')

    const titleBox = screen.getByRole('textbox', {name: /title/i})
    const saveButton = screen.getByRole('button', {name: /save/i})

    await userEvent.click(saveButton)

    screen.getByText('Please enter a title')

    await userEvent.type(titleBox, 'Test Todo')
    expect(screen.queryByText('Please enter a title')).toBeNull()

    await userEvent.click(saveButton)

    expect(saveButton.hasAttribute('disabled')).toBe(true)

    await screen.findByText(/Test Todo/i)
  })
})
