import { Middleware, Request, Response } from "@avanda/http";
import User  from '../models/User';

export default class ValidateSignUp implements Middleware {
  boot(res: Response, req: Request) {
    return req.validate((Rule) => ({
      email: new Rule().required().email().unique(new User()),
      username: new Rule().required().minLength(5),
      password: new Rule().required().minLength(6),
      confirmPassword: new Rule()
        .required()
        .refs("password")
        .error("Confirm password must match password")
    }));
  }
}
