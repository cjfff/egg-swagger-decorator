/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-06-29 14:56:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/swagger-decorator-test/app/controller/test.ts
 */
import { Controller, Context } from "egg";
import {
  request,
  summary,
  path,
  tags,
  responses,
  middlewares,
  description,
} from "../../../../../../lib";
import { PathParamsVO, IGetUserResultVO, IUserListVO } from "../dto";
const testTag = tags(["test"])
export default class Test extends Controller {
  @request("get", "/users")
  @description("get user list")
  @testTag
  @middlewares(async (ctx: Context, next) => {
    ctx.logger.info("mid");
    await next();
  })
  @responses(IUserListVO)
  public async getUsers() {
    const { ctx } = this;
    const users = [{ name: "cjfff" }];
    ctx.body = { users };
  }

  @request("get", "/users/{id}")
  @summary("get user info by id")
  @testTag
  @path(PathParamsVO)
  @responses(IGetUserResultVO)
  public async getUser() {
    const { id } = this.ctx.params;
    this.ctx.body = { id };
  }
}
