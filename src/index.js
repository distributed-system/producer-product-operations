import app from './app'
import debug from 'debug'
import dotenv from 'dotenv'
import death from 'death'
import { openQueueConnection } from 'queue'

const port = process.env.PORT || 4000
const amqpEndpoint = process.env.AMQP_ENDPOINT || 'amqp://localhost:5672'
const queueName = process.env.QUEUE_NAME || 'product.create'
const whenProcessDie = death({ uncaughtException: true })
const log = debug('producer:product:operations:log')

/** 
 * Main method of execution.
 * 
 * @example main()
 * 
 * @returns {Promise<Koa>} - The application itself.
*/
const main = async () => {
  const amqpData = await openQueueConnection(amqpEndpoint, queueName)
  app.context.amqp = { ...amqpData, queueName }
  
  //eslint-disable-next-line no-console
  log.log = console.log.bind(console)

  dotenv.config()

  const server = app.listen(port, () => log(`Server listening on port ${port}`))

  whenProcessDie(async () => {
    await amqpData.channel.close()
    await amqpData.connection.close()

    server.close(() => {
      process.exit(0)
    })
  })
}

main()

