import "dotenv/config";
import express, { Express } from "express";
import routes from "./routes";
import { connection } from "./data/database";

connection();

const port: number = parseInt(process.env.PORT as string, 10) || 3000;

const app: Express = express();

app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
