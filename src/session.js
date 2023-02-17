const Koa = require('koa')
const session = require('koa-session')

const app = new Koa()

// `app.keys` must be set when using `signed` cookie
app.keys = ['test_key']

app.use(session(app))

app.use((ctx, next) => {
  const views = ~~ctx.session.views + 1
  ctx.session.views = views
  ctx.body = `${views} views`
  next()
})

app.listen(process.argv[2])
