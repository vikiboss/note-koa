const Koa = require('koa')

const app = new Koa()

// `app.keys` must be set when using `signed` cookie
app.keys = ['test_key']

app.use((ctx, next) => {
  const views = ~~ctx.cookies.get('view', { signed: true }) + 1
  ctx.cookies.set('view', views, { signed: true })
  ctx.body = `${views} views`
  next()
})

app.listen(process.argv[2])
