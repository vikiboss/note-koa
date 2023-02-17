const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'hello koa'
  next()
})

app.listen(process.argv[2])
