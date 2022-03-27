import base from "./base";
const mail = `<p>
    hello {{user.full_name}}, welcome to tyfarms.com, click the link below to verify your account<br>
    <a href="{{link}}">Click here to verify email</a>
</p>`

export default base(mail)