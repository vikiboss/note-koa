const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyParser())

app.use((ctx, next) => {
  if (!ctx.path === '/' || ctx.method !== 'POST') {
    next()
  }

  if (!ctx.request.body.name) {
    ctx.throw(400, 'name is required')
  }

  ctx.body = ctx.request.body.name.toUpperCase()
})

app.listen(process.argv[2])
