import { Hono } from 'hono'
import { hc } from 'hono/client'
import { serveStatic } from 'hono/bun'
import {html} from 'hono/html'
import {Todo, TodoForm, TodoRepository} from './types'
import todoRepository from './todoRepository'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

const TodoListView = (props) => html
`<!DOCTYPE html>
  <html>
    <head>
      <script src="https://unpkg.com/htmx.org@1.9.9" integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX" crossorigin="anonymous"></script>
      <script src="/static/index.js"></script>
      <title>${props.title}</title>
      <link rel="stylesheet" href="/static/style.css"></link>
    </head>
    <body>
      <main>
        &nbsp;
        <ul id="list">
          <div id="next" />
        </ul>
      </main>
      <aside>
        <div id="form-wrapper"></div>
        <button hx-get="/todo/form" hx-target="#form-wrapper">Ajouter</button>
      </aside>
    </body>
  </html>
`

const TodoForm = (props) => (
  <form hx-post="/todo/add" hx-target="#next" hx-swap="outerHTML settle:0.1s">
    <fieldset>
      <label for="title">Title</label>
      <input type="text" name="title" id="title" />
    </fieldset>
    <button>Submit</button>
  </form>
)

const TodoItem = (props) => (<>
  <li
    id={props.id}
    class="todo"
    style={{ position: 'absolute', top: `${props.index * 50}px`, transition: 'all 1s ease-in-out' }}
  >
    {props.title}
  </li>
  <form hx-post="/todo/delete" hx-target={`#${props.id}`}>
    <input type="hidden" name="id" value={props.id} />
    <button>Delete</button>
  </form>
  <div id="next" />
</>)

const TodosView = (props) => (<ul id="list">
  {props.items.map((item, i) => <TodoItem title={item.title} index={i} />)}
</ul>)

const addATodo = async (form: TodoForm): Promise<Todo[]> => {
  const todo = await todoRepository.add(form);

  return todo;
}

app.get('/todo', (c) => {
  return c.html(<TodoListView />)
})

app.get('/todo/form', (c) => {
  return c.html(<TodoForm />)
})

app.post('/todo/add', async (c) => {
  const todoForm = await c.req.parseBody() as TodoForm;

  const todo = await addATodo(todoForm)

  return c.html(<TodoItem {...todo} />)
})

app.post('/todo/delete', async (c) => {
  const body = await c.req.parseBody()

  await todoRepository.delete(body.id)

  return c.html('')
})

export default app
