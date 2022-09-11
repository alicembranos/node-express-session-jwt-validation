import { USERS_BBDD } from "../bbdd.js";

export const authByEmailPwd = (email, password) => {
  const user = USERS_BBDD.find((user) => user.email === email);

  if (!user) throw new Error();

  if (user.password !== password) throw new Error();

  return user;
};
