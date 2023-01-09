import * as asb from "@azure/service-bus";

const connectionString = "";
const topicName = "";
const subscriptionName = "";

async function sendMessage() {
  const serviceBus = new asb.ServiceBusClient(connectionString);

  const sender = serviceBus.createSender(topicName);

  await sender.sendMessages({
    body: "Example body",
    applicationProperties: { "my-property": "my-value" },
  });

  console.log("Message sent");

  console.log("Process Complete");
  process.exit(0);
}

async function listenMessage() {
  const serviceBus = new asb.ServiceBusClient(connectionString);

  const receiver = serviceBus.createReceiver(topicName, subscriptionName);

  const myMessageHandler = async (messageReceived) => {
    console.log(`Received message: ${messageReceived.body}`);
  };

  const myErrorHandler = async (error) => {
    console.log(error);
  };

  receiver.subscribe({
    processMessage: myMessageHandler,
    processError: myErrorHandler,
  });

  await asb.delay(5000);

  await receiver.close();
  await serviceBus.close();
}

sendMessage();
// listenMessage();
