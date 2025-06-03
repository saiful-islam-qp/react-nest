import {screen} from '@testing-library/dom'
import {App} from '../../../App'
import {testUtil} from '../../../tests/testUtil'
import userEvent from '@testing-library/user-event'
import {http, HttpResponse, mswTestServer} from '../../../msw/mswTestServer'
import {API_BASE_URL} from '../../../constants/appConstants'

describe('TodoListScreen', () => {
  test('User should a todos list', async () => {
    await testUtil.renderWithRoute(<App />, {route: '/'})

    // check todo list is displayed
    screen.getByRole('cell', {name: /todo 1/i})
    screen.getByRole('cell', {name: /todo 2/i})
    screen.getByRole('cell', {name: /todo 3/i})
  })

  test('User should be able to create a todo', async () => {
    await testUtil.renderWithRoute(<App />, {route: '/'})

    // open the create todo dialog
    const createTodoButton = await screen.findByRole('button', {
      name: /create todo/i,
    })
    await userEvent.click(createTodoButton)
    screen.getByRole('dialog')

    const titleBox = screen.getByRole('textbox', {name: /title/i})
    const saveButton = screen.getByRole('button', {name: /save/i})

    // Check for validation message
    await userEvent.click(saveButton)
    screen.getByText('Please enter a title')

    // enter title and click save
    await userEvent.type(titleBox, 'Test Todo')
    expect(screen.queryByText('Please enter a title')).toBeNull()
    expect(saveButton.hasAttribute('disabled')).toBe(false)

    await userEvent.click(saveButton)

    await screen.findByText(/Test Todo/i)
  })

  test('welcome message is displayed if there are no todos', async () => {
    mswTestServer.use(
      http.get(`${API_BASE_URL}todos`, async () => {
        return HttpResponse.json({data: []})
      }),
    )
    await testUtil.renderWithRoute(<App />, {route: '/'})

    // verify welcome message is displayed with create todo button p
    screen.getByText(/welcome to the todo app/i)
    screen.getByRole('button', {name: /create todo/i})
  })

  test('welcome message is not displayed if there are todos', async () => {
    await testUtil.renderWithRoute(<App />, {route: '/'})

    // verify welcome message is not displayed
    expect(screen.queryByText(/welcome to the todo app/i)).toBeNull()
    expect(screen.queryByRole('button', {name: /create todo/i})).not.toBeNull()
  })

  test('Error message is displayed if create todo api call fails', async () => {
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
