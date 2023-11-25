import app from "./App";
import mongoose from "mongoose";
import dotenvConfig from "./App/dotenvConfig";

// let server: Server;

async function main() {
  mongoose.connect(dotenvConfig.DB_URL as string);
  app.listen(dotenvConfig.PORT, () =>
    console.log(
      `Server Connected Successfully, and Running at the port :${dotenvConfig.PORT}!`
    )
  )
}

main();
