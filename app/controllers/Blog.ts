import { Hash } from "@avanda/app";
import { Controller, Request, Response, Get, Post } from "@avanda/http";
import LoggedUsersOnly from "../middlewares/LoggedUsersOnly";
import VerifiedUsersOnly from "../middlewares/VerifiedUsersOnly";
import Blog from "../models/Blog";

export default class extends Controller {
  model?: Blog;

  @Get()
  async get(res: Response, req: Request) {
    let posts = await this.model.orderBy("title", "DESC").all();

    return res.success<any>("hello world", posts);
  }

  @Post()
  async checkIfValidPost(res: Response, req: Request) {
    const { title, author, id } = req.data;
    let postId = title.substr(title.length - 6);
    const post = await this.model?.where({ post_id: postId, id: id }).first();
    if (!post) {
      return res.error("Post not found");
    }
    return res.success<any>("post found", post);
  }

  @Post()
  async checkIfEditablePostIsValid(res: Response, req: Request) {
    const { postId , id } = req.data;
    const post = await this.model?.where({ post_id: postId, id: id }).first();
    if (!post) {
      return res.error("Post not found");
    }
    return res.success<any>("post found", post);
  }

  @Get(new LoggedUsersOnly(), new VerifiedUsersOnly())
  async isOwnedByUser(res: Response, req: Request) {
    let userPostid = req.getAttrs<object>("user_id");
    if(!userPostid){
      return res.error("User not found")
    }
    return res.success("post user-id found", userPostid);
  }

  @Post(new LoggedUsersOnly(), new VerifiedUsersOnly())
  async createPost(res: Response, req: Request) {
    const { postTitle, editorContent, tags, coverImage } = req.data;
    let postImage = req.getFile("coverImage");
    let title = postTitle.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    let strTitle = title.replace(/\s+/g, "-").toLowerCase();
    postImage.mv("./public/post-imgs/" + strTitle + Hash.random(8) + ".png");
    console.log(req.getAttrs("user"));
    const user: any = req.getAttrs("user");
    const post = await this.model?.create({
      post_id: await Hash.random(6, false),
      user_id: user.id,
      author: user.username,
      title: postTitle,
      content: editorContent,
      post_image: strTitle + ".png",
      tags: tags,
    });
    if(!post){
      return res.error("Post not created")
    }
    return res.success<any>("post created", post);
  }
}
