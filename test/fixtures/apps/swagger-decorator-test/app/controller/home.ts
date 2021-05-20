/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-05-20 12:29:06
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
import { TestVo, TestDto, PathParamsVo } from "../dto";

const tag = tags(["Home"]);

const logTime = () => async (ctx: Context, next) => {
  ctx.logger.info(`start: ${new Date()}`);
  await next();
  ctx.logger.info(`end: ${new Date()}`);
};

export default class HomeController extends Controller {
  @request("GET", "/", true)
  @middlewares([logTime()])
  @tag
  @query(TestDto)
  // @body(TestDto)
  @responses({
    200: {
      description: "success",
      type: TestVo,
    },
  })
  public async index() {
    const { ctx, service } = this;
    ctx.body = await service.test.sayHi("egg");
  }

  @request("post", "/post/{id}")
  @middlewares([logTime()])
  @tag
  @body(TestDto)
  @path(PathParamsVo)
  public async post() {
    const { ctx, service } = this;
    ctx.body = await service.test.sayHi("egg");
  }
  @request("get", "/get/:id")
  @path(PathParamsVo)
  public async notused() {
    const { ctx, service } = this;
    ctx.body = await service.test.sayHi("egg");
  }
}
