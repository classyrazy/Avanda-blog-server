import { Middleware, Request, Response } from "@avanda/http";
import User from "../models/User";
export default class VerifiedUsersOnly implements Middleware{
    async boot(res: Response,req: Request) {

        try {
            let session : any = await new User().getActiveSession(req)

            req.setAttr('user_id',session.user_id)

            let user = await new User().find(session?.user_id);

            if (!user)
                throw new Error('you are not logged in')
            else if(!user.email_verified)
                throw new Error('you are not verified')
            req.setAttr('user',user)

            return !!user.email_verified;
        }catch (e) {
            return res.error('You are not Verified')
        }
    }

}