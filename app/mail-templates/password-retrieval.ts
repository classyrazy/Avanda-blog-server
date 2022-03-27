import base from "./base";
const mail = `<p>
    hello {{user.full_name}}, you have requested to retrieve your password, click the link below to change your password<br>
    <a href="{{link}}">Click here to verify email</a>
    <br>
    <br>
    Kindly ignore this email if you didn't initiate this action and reply this email to report to admin
</p>`

export default base(mail)