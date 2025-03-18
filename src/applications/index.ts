import express, { Application } from "express";
import apiRoute from "./routes";
import { runCommand } from "@/shared/utils/shell_command";
import { errorHandler } from "@/shared/middlewares/error-handler";

const app: Application = express();
const port: number = 3000;

(async () => {
  try {
    // apply anychange from prima schema
    await runCommand("npx prisma db push --accept-data-loss");
    console.log("Prisma db push completed successfully.");

    // Middleware
    app.use(express.raw({}));
    app.use(express.json({}));
    app.use(express.urlencoded({ extended: true }));
    app.use(apiRoute);
    app.use(errorHandler);

    // Start the server
    app.listen(port, () => {
      console.log(`Server Running here 👉 http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to run Prisma command. Server not started.");
    process.exit(1); // Exit the process with an error code
  }
})();
