import Router from 'koa-router'
import { sendMessage } from 'queue'
import { Product } from 'messages'

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
  const product = await new Product('Product x', 'Description x', 'asd123a').encode()
  ctx.body = await sendMessage(product, queueName, channel)
}

export default new Router({ prefix: '/product:s?' })
  .get('/', findProducts)