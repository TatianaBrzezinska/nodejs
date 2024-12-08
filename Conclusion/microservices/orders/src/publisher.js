const amqp = require('amqplib');

let channel;

async function connect() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue('orders');
}

async function publishOrder(order) {
  if (!channel) await connect();
  channel.sendToQueue('orders', Buffer.from(JSON.stringify(order)));
}

module.exports = { publishOrder };
