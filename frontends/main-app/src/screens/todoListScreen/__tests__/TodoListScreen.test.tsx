import {screen} from '@testing-library/dom'
import {App} from '../../../App'
import {testUtil} from '../../../tests/testUtil'
import userEvent from '@testing-library/user-event'
import {http, HttpResponse, mswTestServer} from '../../../msw/mswTestServer'
import {API_BASE_URL} from '../../../constants/appConstants'

describe('TodoListScreen', () => {
  test('Initially a user should see welcome screen with create todo button', async () => {
    await testUtil.renderWithRoute(<App />, {route: '/'})

    screen.getByText('Welcome to the Todo App')
    const createTodoButton = screen.getByRole('button', {name: /create todo/i})

    await userEvent.click(createTodoButton)

    screen.getByRole('dialog')

    const titleBox = screen.getByRole('textbox', {name: /title/i})
    const saveButton = screen.getByRole('button', {name: /save/i})

    // Check for validation message
    await userEvent.click(saveButton)
    screen.getByText('Please enter a title')

    await userEvent.type(titleBox, 'Test Todo')
    expect(screen.queryByText('Please enter a title')).toBeNull()
    expect(saveButton.hasAttribute('disabled')).toBe(false)

    await userEvent.click(saveButton)

    await screen.findByText(/Test Todo/i)
  })

  test('Error message is displayed if api call fails', async () => {
    mswTestServer.use(
      http.post(`${API_BASE_URL}todos`, async () => {
        return HttpResponse.error()
      }),
    )

    await testUtil.renderWithRoute(<App />, {route: '/'})

    // open the create todo dialog
    const createTodoButton = screen.getByRole('button', {name: /create todo/i})
    await userEvent.click(createTodoButton)
    screen.getByRole('dialog')

    const titleBox = screen.getByRole('textbox', {name: /title/i})
    const saveButton = screen.getByRole('button', {name: /save/i})

    // enter title and click save
    await userEvent.type(titleBox, 'Test Todo')
    expect(screen.queryByText('Please enter a title')).toBeNull()
    expect(saveButton.hasAttribute('disabled')).toBe(false)

    await userEvent.click(saveButton)

    // screen.debug()
    // verify error message is displayed
    await screen.findByText(/failed to fetch/i)
  })
})
