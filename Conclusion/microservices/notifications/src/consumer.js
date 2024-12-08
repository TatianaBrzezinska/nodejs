const amqp = require('amqplib');

let notifications = [];

async function consumeOrders() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue('orders');

  channel.consume('orders', (msg) => {
    const order = JSON.parse(msg.content.toString());
    notifications.push(order);
    console.log('Notification received:', order);
    channel.ack(msg);
  });
}

function getNotifications() {
  return notifications;
}

module.exports = { consumeOrders, getNotifications };
