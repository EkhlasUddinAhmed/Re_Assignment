import app from "./App";
import mongoose from "mongoose";
import dotenvConfig from "./App/dotenvConfig";

// let server: Server;

async function main() {
  mongoose.connect(dotenvConfig.DB_URL as string)
  .then(()=>{
    app.listen(dotenvConfig.PORT, () =>
    console.log(
      `Server Connected Successfully, and Running at the port :${dotenvConfig.PORT}!`
    )
  )
  })
  .catch((err)=>{
       console.log("Server Connection Fail");
  });
  
}

main();
