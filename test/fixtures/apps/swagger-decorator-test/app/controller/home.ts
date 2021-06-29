/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-06-29 14:57:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/swagger-decorator-test/app/controller/home.ts
 */
import { Context, Controller } from "egg";
import {
  middlewares,
  request,
  responses,
  tags,
  query,
  body,
  path,
} from "../../../../../../lib";
import { AAAVO, TestDto, PathParamsVO } from "../dto";

const tag = tags(["Home"]);

const logTime = () => async (ctx: Context, next) => {
  ctx.logger.info(`start: ${new Date()}`);
  await next();
  ctx.logger.info(`end: ${new Date()}`);
};

export default class HomeController extends Controller {
  @request("get", "/", true)
  @middlewares([logTime()])
  @tag
  @query(TestDto)
  @responses(AAAVO)
  public async index() {
    const { ctx, service } = this;
    ctx.body = await service.test.sayHi("egg");
  }

  @request("get", "/home", true)
  @middlewares([logTime()])
  @tag
  @query(TestDto)
  @responses({
    200: {
      description: "success",
      type: AAAVO,
    },
  })
  public async Home() {
    const { ctx, service } = this;
    ctx.body = await service.test.sayHi("egg");
  }

  @request("post", "/post/{id}")
  @middlewares([logTime()])
  @tag
  @body(TestDto)
  @path(PathParamsVO)
  public async post() {
    const { ctx, service } = this;
    ctx.body = await service.test.sayHi("egg");
  }

  @request("get", "/get/:id")
  @tag
  @path(PathParamsVO)
  public async notused() {
    const { ctx, service } = this;
    ctx.body = await service.test.sayHi("egg");
  }
}
