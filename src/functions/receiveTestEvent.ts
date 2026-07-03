import { app, InvocationContext } from "@azure/functions";
import sql from "mssql";

const sqlConfig: sql.config = {
  server: process.env.SQL_SERVER!,
  database: process.env.SQL_DATABASE!,
  options: {
    encrypt: true,
  },
  authentication: {
    type: "azure-active-directory-msi-app-service",
    options: {},
  },
};

app.serviceBusQueue("receiveTestEvent", {
  queueName: "jaytest-events",
  connection: "ServiceBusConnection",

  handler: async (
    message: unknown,
    context: InvocationContext
  ): Promise<void> => {
    context.log("Received message", message);

    const pool = await sql.connect(sqlConfig);

    try {
        const pool = await sql.connect(sqlConfig);

        await pool.request().query(`
            UPDATE dbo.updates
            SET value = value + 1,
                last_updated = SYSUTCDATETIME()
            WHERE id = 1;
        `);
    } catch (error) {
        context.error("SQL update failed", error);
        throw error;
    }
  },
});