import express from "express";
import cors from "cors";
import connectMongoose from "./util/connectMongoose.js";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";

const server = express();
const PORT = process.env.PORT;

server.use(express.json(), cors());
server.use("/user", userRouter);

server.get("/", (req, res) => {
  res.send("Hallo Hallo");
});

if (await connectMongoose()) {
  server.listen(PORT, () => {
    console.log("server started on Port ", PORT);
  });
}
