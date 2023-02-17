const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')

const app = new Koa()

app.keys = ['test_key']

const auth = {
  username: 'username',
  password: 'password'
}

const form =
  '<form action="/login" method="POST">\
      <input name="username" type="text" value="username">\
      <input name="password" type="password" placeholder="The password is \'password\'">\
      <button type="submit">Submit</button>\
    </form>'

app.use(session(app))
app.use(bodyParser())

app.use((ctx, next) => {
  const authenticated = ctx.session.authenticated === true

  if (ctx.path === '/') {
    if (authenticated) {
      ctx.body = 'hello world'
    } else {
      ctx.throw(401)
    }
  }

  if (ctx.path === '/login') {
    if (ctx.method === 'POST') {
      const { username, password } = ctx.request.body

      if (username === auth.username && password === auth.password) {
        ctx.session.authenticated = true
        ctx.redirect('/')
      } else {
        ctx.throw(400)
      }
    }

    if (ctx.method === 'GET') {
      if (authenticated) {
        ctx.redirect('/')
      } else {
        ctx.set('content-type', 'text/html')
        ctx.body = form
      }
    }
  }

  if (ctx.path === '/logout') {
    ctx.session.authenticated = false
    ctx.redirect('/login')
  }

  next()
})

app.listen(process.argv[2])
