const Koa = require('koa')

const app = new Koa()

app.use(errorHandler)

app.use(ctx => {
  if (ctx.path === '/error') {
    throw new Error('oops')
  }

  ctx.body = 'OK'
})

app.listen(process.argv[2])

async function errorHandler(ctx, next) {
  try {
    await next()
  } catch {
    ctx.status = 500
    ctx.body = 'internal server error'
  }
}
