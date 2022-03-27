"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@avanda/app");
const http_1 = require("@avanda/http");
const LoggedUsersOnly_1 = __importDefault(require("../middlewares/LoggedUsersOnly"));
const VerifiedUsersOnly_1 = __importDefault(require("../middlewares/VerifiedUsersOnly"));
class default_1 extends http_1.Controller {
    async get(res, req) {
        let posts = await this.model.orderBy("title", "DESC").all();
        return res.success("hello world", posts);
    }
    async checkIfValidPost(res, req) {
        var _a;
        const { title, author, id } = req.data;
        let postId = title.substr(title.length - 6);
        const post = await ((_a = this.model) === null || _a === void 0 ? void 0 : _a.where({ post_id: postId, id: id }).first());
        if (!post) {
            return res.error("Post not found");
        }
        return res.success("post found", post);
    }
    async checkIfEditablePostIsValid(res, req) {
        var _a;
        const { postId, id } = req.data;
        const post = await ((_a = this.model) === null || _a === void 0 ? void 0 : _a.where({ post_id: postId, id: id }).first());
        if (!post) {
            return res.error("Post not found");
        }
        return res.success("post found", post);
    }
    async isOwnedByUser(res, req) {
        let userPostid = req.getAttrs("user_id");
        if (!userPostid) {
            return res.error("User not found");
        }
        return res.success("post user-id found", userPostid);
    }
    async createPost(res, req) {
        var _a;
        const { postTitle, editorContent, tags, coverImage } = req.data;
        let postImage = req.getFile("coverImage");
        let title = postTitle.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        let strTitle = title.replace(/\s+/g, "-").toLowerCase();
        postImage.mv("./public/post-imgs/" + strTitle + app_1.Hash.random(8) + ".png");
        console.log(req.getAttrs("user"));
        const user = req.getAttrs("user");
        const post = await ((_a = this.model) === null || _a === void 0 ? void 0 : _a.create({
            post_id: await app_1.Hash.random(6, false),
            user_id: user.id,
            author: user.username,
            title: postTitle,
            content: editorContent,
            post_image: strTitle + ".png",
            tags: tags,
        }));
        if (!post) {
            return res.error("Post not created");
        }
        return res.success("post created", post);
    }
}
__decorate([
    (0, http_1.Get)()
], default_1.prototype, "get", null);
__decorate([
    (0, http_1.Post)()
], default_1.prototype, "checkIfValidPost", null);
__decorate([
    (0, http_1.Post)()
], default_1.prototype, "checkIfEditablePostIsValid", null);
__decorate([
    (0, http_1.Get)(new LoggedUsersOnly_1.default(), new VerifiedUsersOnly_1.default())
], default_1.prototype, "isOwnedByUser", null);
__decorate([
    (0, http_1.Post)(new LoggedUsersOnly_1.default(), new VerifiedUsersOnly_1.default())
], default_1.prototype, "createPost", null);
exports.default = default_1;
