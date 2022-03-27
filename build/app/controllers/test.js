// import {Controller, Request, Response, Get, Post} from "@avanda/http";
// import Model from "../models/User"
// import ValidateLogin from "../middlewares/forms/ValidateLogin";
// import ValidateRegistration from "../middlewares/forms/ValidateRegistration";
// import {Hash,Mail,Token,Env} from "@avanda/app";
// import LoggedUserOnly from "../middlewares/LoggedUserOnly";
// // @ts-ignore
// import EmailVeriffFrom from "../mail-templates/email-veriff"
// import PasswordRetrieval from "../mail-templates/password-retrieval";
// import Wallet from "../models/Wallet";
// import ValidateUpdatePassword from "../middlewares/forms/ValidateUpdatePassword";
// import Address from "../models/Address";
// import AdminOnly from "../middlewares/AdminOnly";
// import ShouldHaveActiveSession from "../middlewares/ShouldHaveActiveSession";
// import {DataOf} from "@avanda/orm";
// import ValidatePasswordRetrieval from "../middlewares/forms/ValidatePasswordRetrieval";
// import ValidatePasswordReset from "../middlewares/forms/ValidatePasswordReset";
// export default class User extends Controller {
//     model?: Model
//     exclude: string[] = [
//         'password',
//         'email_verification_token',
//         'createdAt',
//         'updatedAt'
//     ]
//     @Get(
//         new LoggedUserOnly()
//     )
//     async get(res: Response,req: Request){
//         const session = await this.model.getActiveSession(req)
//         const user = new Model().find(session.user_id);
//         return res.success<any>('you are logged in',user)
//     }
//     @Post(
//         new ValidateLogin()
//     )
//     async login(res: Response,req: Request,isAdmin = false){
//         let user = await this.model?.where({
//             email: req.getData('email') as string
//         }).first()
//         if (!user){
//             return res.error('Invalid email or password')
//         }
//         if (user.type != 'admin' && isAdmin){
//             return res.error('Unauthorized access')
//         }
//         let password = req.getData<string>('password');
//         let isValidPassword = await Hash.verify(user.password,password)
//         if(!isValidPassword){
//             return res.error('Invalid login details')
//         }
//         let token = null
//         let next = "/dashboard"
//         if (user.email_verification_token){
//         //    user not verified email
//             token = await this.model.createSession(user.id,"email-verification")
//             next = "/email-verification"
//         }else{
//             token = await this.model.createSession(user.id,"logged-in")
//         }
//         // create new session
//         return res.success('login successful', {token,next,nextRequired: false})
//     }
//     @Post(
//         new ValidateLogin()
//     )
//     async adminLogin(res: Response,req: Request){
//         return this.login(res,req,true)
//     }
//     @Post(
//         new LoggedUserOnly(),
//         new ValidateUpdatePassword()
//     )
//     async updatePassword(res: Response,req: Request){
//         let user = req.getAttrs<DataOf<Model>>('user')
//         let password = req.getData<string>('password')
//         let isValidPassword = await Hash.verify(user.password,password)
//         if(isValidPassword){
//             await new Model().ofId(user.id).update({
//                 password: await Hash.make(req.getData('new_password'))
//             })
//             return res.success('Password successfully updated',{
//                 next: '/'
//             })
//         }else{
//             return res.error('Invalid Old Password')
//         }
//     }
//     @Post(
//         new ValidatePasswordRetrieval()
//     )
//     async initiatePasswordRetrieval(res: Response,req: Request){
//         let token = Hash.random(15);
//         let email = req.getData<string>('email')
//         let user = await this.model.where({email}).first()
//         //update the user's password token token
//         await this.model.ofId(user.id).update({
//             password_retrieval_token: token
//         })
//         try {
//             let mailer  = await Mail.send((msg) => {
//                 msg.from('hello@tyfarms.com')
//                 msg.subject('Tyfarms password retrieval!')
//                 msg.to(user.email)
//                 msg.htmlBody(PasswordRetrieval)
//             },{
//                 user,
//                 link: Env.get('BASE_URL') + '/change-password?token=' + token
//             })
//             return res.success('Please check your email for password retrieval link')
//         }catch (e){
//             return res.error(e.message)
//         }
//     }
//     @Post(
//         new ValidatePasswordReset()
//     )
//     async resetPassword(res: Response,req: Request){
//         let password_retrieval_token = req.getData<string>('token');
//         let user = await new Model().where({password_retrieval_token}).first()
//     //    check for token validity
//         if (!password_retrieval_token || !user){
//             return res.error('Invalid or expired password retrieval link')
//         }
//         let newPassword = req.getData<string>('new_password')
//         await new Model().ofId(user.id).update({
//             password: await Hash.make(newPassword),
//             password_retrieval_token: null
//         })
//         return res.success('Password successfully updated',{
//             next: '/'
//         })
//     }
//     @Post(
//         new ValidateRegistration()
//     )
//     async register(res: Response,req: Request){
//         const user = await this.model?.create({
//             email: req.getData('email'),
//             password: await Hash.make(req.getData('password')),
//             full_name: req.getData('full_name') as string,
//         })
//         const emailToken = await Token.generate({id: user.id,email: user.email})
//         //update the user's token
//         await this.model.where({id: user.id}).update({
//             email_verification_token: emailToken
//         })
//         //create wallet for user
//         await new Wallet().create({
//             user_id: user.id,
//             balance: 0,
//             holding_balance: 0
//         })
//         const token = await this.model.createSession(user.id,"email-verification")
//         const link = Env.get('BASE_URL') + '/email-verification?token=' + emailToken
//         await Mail.send((msg) => {
//             msg.from('hello@tyfarms.com')
//             msg.subject('Tyfarms account email verification!')
//             msg.to(user.email)
//             msg.htmlBody(EmailVeriffFrom)
//         },{
//             user,
//             link
//         })
//         //
//         return res.success('Registration was successful',{
//             token,
//             next: '/email-verification'
//         })
//     }
//     @Post()
//     async verifyEmail(res: Response,req: Request){
//         let token = req.getData<string|null>('token')
//         if (!token){
//             return res.error('Token not found')
//         }
//         //get related user
//         try {
//             let deToken = await Token.decode<{id: number,email: string}>(token)
//             let user = await new Model().find(deToken.id)
//             if (!user)
//                 throw new Error('User associated with this link does not exist')
//             if (!user.email_verification_token)
//                 throw new Error('Link already used or expired')
//             await new Model().where({id: deToken.id}).update({
//                 email_verification_token: null
//             })
//             let loginToken = await this.model.createSession(user.id,"logged-in")
//             return res.success('Congrats!, email verification successful', {token: loginToken,next: '/dashboard'})
//         }catch (e){
//             return res.error(e.message)
//         }
//     }
//     @Get()
//     async getLoggedInUser(res: Response,req: Request){
//         try {
//             const session = await this.model.getActiveSession(req)
//             if (session?.user_id && session.auth_stage == 'logged-in'){
//                 try {
//                     let user = await new Model().find(session.user_id)
//                     if (!user)
//                         return res.error('you are not logged')
//                     return res.success('you are logged in', user)
//                 }catch (e){
//                     return res.error(e.message)
//                 }
//             }
//         }catch (e) {
//             return res.error('You are not logged')
//         }
//     }
//     @Post(
//         new LoggedUserOnly()
//     )
//     async setDefaultAddress(res: Response,req: Request){
//         let user = req.getAttrs<typeof this.model>('user')
//         let address_id = req.getData<number>('address_id')
//         if (!address_id || !await new Address().find(address_id))
//             return res.error('Address not found')
//         await this.model.ofId(user.id).update({
//             default_address_id: address_id
//         })
//         return res.success('Successfully set default address')
//     }
//     @Post(
//         new LoggedUserOnly(),
//     )
//     async addAddress(res: Response, req: Request){
//         let userId = req.getAttrs<number>('user_id');
//         req.setData({
//             ...req.data,
//             ...{user_id: userId}
//         })
//         await new Address().create(req.data)
//         return res.success('Address successfully updated')
//     }
//     @Get(
//         new LoggedUserOnly(),
//         new AdminOnly()
//     )
//     async getAllByPage(response: Response, request: Request): Promise<Response> {
//         return super.getAllByPage(response, request);
//     }
//     @Post(
//         new ShouldHaveActiveSession()
//     )
//     async resendEmailLink(response: Response, request: Request): Promise<any> {
//          let user = request.getAttrs<DataOf<Model>>('user')
//         console.log({user})
//         const emailToken = await Token.generate({id: user.id,email: user.email})
//         //update the user's token
//         await this.model.where({id: user.id}).update({
//             email_verification_token: emailToken
//         })
//         let mailer  = await Mail.send((msg) => {
//             msg.from('hello@tyfarms.com')
//             msg.subject('Tyfarms account email verification!')
//             msg.to(user.email)
//             msg.htmlBody(EmailVeriffFrom)
//         },{
//             user,
//             link: Env.get('BASE_URL') + '/email-verification?token=' + emailToken
//         })
//         console.log({mailer})
//         return response.success('Email link successfully sent');
//     }
// }
