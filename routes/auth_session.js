import express from "express";
import { nanoid } from "nanoid";
import { authByEmailPwd } from "../helpers/authByEmailPwd.js";
import { USERS_BBDD } from "../bbdd.js";

const { Router } = express;

//Array for objects session
const sessions = [];
const authSessionRouter = Router();

//Login with email and password
authSessionRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const { guid } = authByEmailPwd(email, password);
    const sessionId = nanoid();
    //we save the sessionId in the array session
    sessions.push({ sessionId, guid });

    res.cookie("sessionId", sessionId, { httpOnly: true });
    return res.send();
  } catch (err) {
    return res.sendStatus(401);
  }
});

authSessionRouter.get("/profile", (req, res) => {
  //Express needs a middleware to read cookies from req object => cookie-parser
  //Cookies are sending automatically in the header of the request once they are generated
  const { cookies } = req;
  if (!cookies.sessionId) return res.sendStatus(401);

  const userSession = sessions.find(
    (session) => session.sessionId === cookies.sessionId
  );

  if (!userSession) return res.sendStatus(401);

  const user = USERS_BBDD.find((user) => user.guid === userSession.guid);

  if (!user) return res.sendStatus(401);

  delete user.password;

  return res.send(user);
});

export default authSessionRouter;
