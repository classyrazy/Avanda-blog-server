import { Column, Model } from "@avanda/orm";
import { Request } from "@avanda/http";
import { Token } from "@avanda/app";

export default class User extends Model {
  id?: number;
  
  // user_id?: number;

  @Column.text({
    unique: true,
    masSize: 255,
  })
  email?: string;

  @Column.text()
  password?: string;

  @Column.text()
  username?: string;

  @Column.text({
    nullable: true,
  })
  email_verification_token?: string;

  @Column.boolean()
  email_verified?: boolean = false;

  @Column.boolean()
  is_loggedin?: boolean = false;

  @Column.text({
    nullable: true,
  })
  picture?: string;

  async getActiveSession(req: Request) {
    let token = req.getHeader<string>("authorization").split(" ")[1];
    return await Token.decode(token);
  }

  async createSession(user_id: number) {
    return await Token.generate({ user_id });
  }
}
