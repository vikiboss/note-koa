const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  if (ctx.path === '/') {
    ctx.body = 'hello koa'
  } else {
    next()
  }
})

app.use((ctx, next) => {
  if (ctx.path === '/404') {
    ctx.body = 'page not found'
  } else {
    next()
  }
})

app.use((ctx, next) => {
  if (ctx.path === '/500') {
    ctx.body = 'internal server error'
  } else {
    next()
  }
})

app.listen(process.argv[2])
