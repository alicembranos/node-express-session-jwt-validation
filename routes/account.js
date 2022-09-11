import {Router} from "express";
import { USERS_BBDD } from "../bbdd.js";

const accountRouter = Router();

//Middleware to log ip address
accountRouter.use((req, res, next) => {
  console.log(req.ip);
  next();
});

//Get the details of an account from the guid
accountRouter.get("/:guid", (req, res) => {
  const { guid } = req.params;
  const user = USERS_BBDD.find((user) => user.guid === guid);

  if (!user) return res.status(404).send();

  return res.send(user);
});

//Create a new account
accountRouter.post("/", (req, res) => {
  const { guid, name } = req.body;

  if (!guid || !name) return res.status(400).send();

  const user = USERS_BBDD.find((user) => user.guid === guid);
  if (user) return res.status(409).send();

  USER_BBDD.push({ guid, name });

  return res.send();
});

//Update the name of an account
accountRouter.patch("/:guid", (req, res) => {
  const { guid } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).send();
  const user = USERS_BBDD.find((user) => user.guid === guid);

  if (!user) return res.status(404).send();

  user.name = name;

  return res.send();
});

//Delete an account
accountRouter.delete("/:guid", (req, res) => {
  const { guid } = req.params;
  const userIndex = USERS_BBDD.findIndex((user) => user.guid === guid);

  if (userIndex === -1) return res.status(404).send();

  USER_BBDD.splice(userIndex, 1);

  return res.send();
});

export default accountRouter;
