import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import accountRouter from "./routes/account.js";
import authRouter from "./routes/auth.js";
import authSessionRouter from "./routes/auth_session.js";
import authTokenRouter from "./routes/auth_token.js";

dotenv.config();

const PORT = process.env.PORT;
const expressServer = express();

expressServer.use(cookieParser())
expressServer.use(express.json());
expressServer.use(express.text());
expressServer.use("/account", accountRouter);
expressServer.use("/auth", authRouter);
expressServer.use("/auth-token", authTokenRouter);
expressServer.use("/auth-session", authSessionRouter);

expressServer.get("/raiz", (req, res) => res.send());

expressServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
