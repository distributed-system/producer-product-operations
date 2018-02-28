import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import products from './product/routes'

const app = new Koa()

export default app.use(bodyparser())
  .use(products.routes())