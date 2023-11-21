import { Hono } from 'hono'
import { hc } from 'hono/client'
import { serveStatic } from 'hono/bun'
import {html} from 'hono/html'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

const Layout = (props: SiteData) => html
`<!DOCTYPE html>
  <html>
    <head>
      <title>${props.title}</title>
    </head>
    <body>
      ${props.children}
    </body>
  </html>
`

app.get('/todo', (c) => {
  console.log('todo')
  return c.html(<Layout />)
})

export default app
