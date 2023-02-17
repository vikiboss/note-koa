const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  const isJson = ctx.request.is('application/json')
  ctx.body = isJson ? { message: 'hi!' } : 'ok'
  next()
})

app.listen(process.argv[2])
