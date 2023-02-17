const Koa = require('koa')
const fs = require('fs')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyParser())

app.use((ctx, next) => {
  if (ctx.path === '/stream') {
    ctx.body = fs.createReadStream(process.argv[3])
  } else {
    next()
  }
})

app.use((ctx, next) => {
  if (ctx.path === '/json') {
    ctx.body = { foo: 'bar' }
  } else {
    next()
  }
})

app.listen(process.argv[2])
