import express from "express";
import cors from "cors";
import connectMongoose from "./util/connectMongoose.js";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import expressFileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

const server = express();
const PORT = process.env.PORT;

server.use(express.json(), cookieParser());
server.use(
  cors({
    origin: "http://localhost:3000", // Der Create React App Port
    credentials: true, // Cookies zulassen
  })
);
server.use(
  expressFileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "./tmp",
  })
);
server.use("/", userRouter);
server.use("/", eventRouter);

server.get("/", (req, res) => {
  res.send("Hallo Hallo");
});

if (await connectMongoose()) {
  server.listen(PORT, () => {
    console.log("server started on Port ", PORT);
  });
}
