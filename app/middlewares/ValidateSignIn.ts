import { Middleware, Request, Response } from "@avanda/http";
import User  from '../models/User';

export default class ValidateSignIn implements Middleware{
    boot(res: Response, req: Request){
        return req.validate((Rule) => ({
            email: new Rule().required().email().exists(new User()),
            password: new Rule().required().minLength(6)
        }));
    }

}