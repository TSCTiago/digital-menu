import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes";
dotenv.config();

const port = process.env.PORT || 8080;
export const app = express();

app.use(bodyParser.json());
app.use(cors());

routes(app);

app.listen(port, async () => {
  console.log(`[server]: Server is running at ${port}`);
});
