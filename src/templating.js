const Koa = require('koa')
const views = require('co-views')

const app = new Koa()

const render = views(__dirname + '/views', { ext: 'ejs' })

const user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
}

app.use(async (ctx, next) => {
  ctx.body = await render('user', { user })
  next()
})

app.listen(process.argv[2])
