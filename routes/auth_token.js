import express from "express";
import { authByEmailPwd } from "../helpers/authByEmailPwd.js";
import { SignJWT, jwtVerify } from "jose";
import { USERS_BBDD } from "../bbdd.js";
import validateLoginDTO from "../middlewares/validate_login_dto.js";

const { Router } = express;

const authTokenRouter = Router();

//TOKEN 3 particularities:
// 1 - It must contain info
// 2 - Time stamp (time delay)
// 3 - It must be verifiabe

//Tokens normally are signed and with this sign we can prove that it has not been modified

//Login with email and password
authTokenRouter.post("/login", validateLoginDTO, async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const { guid } = authByEmailPwd(email, password);

    //GENERATE TOKEN AND RETURN IT
    const jwtConstructor = new SignJWT({ guid });
    //Encode to Uint8Array ( library from JS)
    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    //We can store the jwt in a cookie, but cookies are limited in size, therefore we could have problems if we want to store a long jwt with a lot of data in the payload
    return res.send({ jwt });
  } catch (err) {
    return res.sendStatus(401);
  }
});

authTokenRouter.get("/profile", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.statusCode(401);

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    const user = USERS_BBDD.find((user) => user.guid === payload.guid);

    if (!user) return res.sendStatus(401);
    delete user.password;
    return res.send(user);
  } catch (error) {
    res.sendStatus(401);
  }
});

export default authTokenRouter;
