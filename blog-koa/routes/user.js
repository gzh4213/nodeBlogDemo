const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  console.log(ctx.request)
  const { username, password } = ctx.request.body
  ctx.body = {
    errno: 0,
    username,
    password
  }
})


module.exports = router
