import { Env, Hash, Mail, Token } from "@avanda/app";
import { Controller, Request, Response, Get, Post } from "@avanda/http";
import LoggedUsersOnly from "../middlewares/LoggedUsersOnly";
import ValidateSignIn from "../middlewares/ValidateSignIn";
import ValidateSignUp from "../middlewares/ValidateSignUp";
import UserModel from "../models/User";

export default class User extends Controller {
  model?: UserModel;

  @Get()
  async get(res: Response, req: Request) {
    console.log(req);
    return res.success<any>("hello world", this.model?.first());
  }
  @Post(new ValidateSignIn())
  async signin(res: Response, req: Request) {
    const { email, password } = req.data;
    const user = await this.model?.where({ email }).first();
    console.log(user);
    if (!user) {
      console.log("user not found");
      return res.error("User not found");
    }
    if (!(await Hash.verify(user.password, password))) {
      console.log("password not match");
      return res.error("Password is incorrect");
    }

    let token = null;
    let next = "/posts";
    token = await this.model.createSession(user.id);
    return res.success("Succefully logged in", { user, token, next });
  }
  @Post(new ValidateSignUp())
  async signup(res: Response, req: Request) {
    const user = await this.model?.create({
      email: req.getData("email"),
      password: await Hash.make(req.getData("password")),
      username: req.getData("username"),
    });
    const emailToken = await Token.generate(
      { id: user.id, email: user.email },
      "10min"
    );

    //update the user's token
    await this.model.ofId(user.id).update({
      email_verification_token: emailToken,
    });
    const token = await this.model.createSession(user.id);
    const link = Env.get("BASE_URL") + "/verify-email?token=" + emailToken;

    // send token to user's gmail

    await Mail.send((msg) => {
      msg.from("avanda@blog.com");
      msg.subject("Verify your avandablog account!");
      msg.to(user.email);
      msg.htmlBody(
        "Hello " +
          user.username +
          ", welcome to avandablog, click the link below to verify your account<br><a href=" +
          link +
          ">Click here to verify email</a>"
      );
    }, {});
    // SEND TOKEN TO CLIENT TO CROSS CHECK
    return res.success("Registeration successful", {
      token,
      next: "/verify-email",
    });
  }

  @Post()
  async verifyEmail(res: Response, req: Request) {
    const { token } = req.data;
    console.log(token);
    try {
      let decodedToken = await Token.decode<{id: number,email: string}>(token);
      const user = await this.model?.ofId(decodedToken.id).first();
      if (!user) {
        return res.error("Invalid token");
      }
      await this.model.ofId(user.id).update({
        email_verified: true,
        email_verification_token: null,
      });
      return res.success("Email verified", {
        next: "/login",
      });
    } catch (error) {
      return res.error(error.message);
    }
  }
  @Get(new LoggedUsersOnly())
  async checkIfVerified(res: Response, req: Request) {
    let isUserVerified = await (await this.model?.ofId(req.getAttrs("user_id")).first()).email_verified
    if(isUserVerified) {
      return res.success("verified");
    }
    return res.error("not verified");
  }

  @Get(new LoggedUsersOnly())
  async resendVerifyEmail(res: Response, req: Request) {
    try {
      const user:any = await req.getAttrs("user");
    console.log(user);
    if (!user) {
      return res.error("User not found");
    }
    const emailToken = await Token.generate(
      { id: user.id, email: user.email },
      "10min"
    );
    await this.model.ofId(user.id).update({
      email_verification_token: emailToken,
    });
    const link = Env.get("BASE_URL") + "/verify-email?token=" + emailToken;
    await Mail.send((msg) => {
      msg.from("avanda@blog.com");
      msg.subject("Verify your avandablog account!");
      msg.to(user.email);
      msg.htmlBody(
        "Hello " +
          user.username +
          ", welcome to avandablog, click the link below to verify your account<br><a href=" +
          link +
          ">Click here to verify email</a>"
      );
    }, {});
    return res.success("Email sent");
    } catch (error) {
      return res.error(error.message);
    }
  }
}
