const Koa = require('koa')

const app = new Koa()

app.use(setBody)
app.use(recordTime)
app.use(upperCase)

app.listen(process.argv[2])

function setBody(ctx, next) {
  ctx.body = 'hello koa'
  next()
}

function recordTime(ctx, next) {
  ctx.set('X-Response-Time', Date.now())
  next()
}

function upperCase(ctx, next) {
  ctx.body = ctx.body.toUpperCase()
  next()
}
