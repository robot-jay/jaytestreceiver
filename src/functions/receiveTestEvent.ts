import { app, InvocationContext } from "@azure/functions";

app.serviceBusQueue("receiveTestEvent", {
  queueName: "jaytest-events",
  connection: "ServiceBusConnection",

  handler: async (
    message: unknown,
    context: InvocationContext
  ): Promise<void> => {
    context.log("Received Service Bus message:", message);

    //TODO: Increment database value here
  },
});