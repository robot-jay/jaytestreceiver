import { app, InvocationContext } from "@azure/functions";

app.serviceBusQueue("receiveTestEvent", {
  queueName: "jaytest-events",
  connection: "ServiceBusConnection",

  handler: async (
    message: unknown,
    context: InvocationContext
  ): Promise<void> => {
    context.log("Received message:", JSON.stringify(message));
  },
});