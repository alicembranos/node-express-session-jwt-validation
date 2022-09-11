import { Router } from "express";
import { authByEmailPwd } from "../helpers/authByEmailPwd.js";

const authRouter = Router();

//Endpoint public (No authorized, no authenticated)
authRouter.get("/public", (req, res) => res.send("End point Publico"));

//Endpoint authenticated for every registered suer
authRouter.post("/autenticathed", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send("Bad request");

  try {
    const user = authByEmailPwd(email, password);
    return res.status(200).send(`User ${user.name} authenticated.`);
  } catch (err) {
    return res.status(401).send(err);
  }
});

//Endpoint authorized
authRouter.post("/authorized", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send("Bad request");

  try {
    const user = authByEmailPwd(email, password);
    if (user.role !== "admin")
      return res.status(403).send(`User ${user.name} not authorized`);
    return res.status(200).send(`User admin ${user.name}`);
  } catch (err) {
    return res.status(401).send(err);
  }
});

export default authRouter;
