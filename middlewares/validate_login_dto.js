import { Type } from "@sinclair/typebox";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import Ajv from "ajv";

const loginDTOSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "Tye must be a string",
        format: "Email must have a valid email format",
      },
    }),
    password: Type.String({
      errorMessage: { type: "Password must be a string" },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "Object format is not valid",
    },
  }
);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]);
addErrors(ajv);
const validate = ajv.compile(loginDTOSchema);

const validateLoginDTO = (req, res, next) => {
  const isDTOValid = validate(req.body);

  if (!isDTOValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));

  next();
};

export default validateLoginDTO;
