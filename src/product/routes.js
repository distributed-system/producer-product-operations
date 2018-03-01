import Router from 'koa-router'
import { sendMessage } from 'queue'

/* disabling next line to enable jsdoc type inference */
//eslint-disable-next-line no-unused-vars
import Koa from 'koa'

/** 
 * Method to find products.
 * 
 * @param {Koa.Context} ctx - Koa context.
 * 
 * @example await findProducts()
 * 
 * @returns {Promise} Awaitable task. 
*/
export async function findProducts(ctx) {
  const { channel, queueName } = ctx.amqp
  ctx.body = await sendMessage(JSON.stringify({ 
    name: 'Product x',
    description: 'Description x',
    sku: 'asd123a',
    created_at: new Date() 
  }), queueName, channel)
}

export default new Router({ prefix: '/product:s?' })
  .get('/', findProducts)