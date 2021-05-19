/*
 * @Author: your name
 * @Date: 2021-05-17 00:44:07
 * @LastEditTime: 2021-05-19 14:13:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/swagger-decorator-test/app/middleware/error-handler.ts
 */

/**
 * 错误处理中间件
 * 将改中间件放在所有中间件前面，就可以捕获所有错误
 */

import { Middleware } from "koa-compose";
import { Context } from "egg";

export default function errorHandler(): Middleware<Context> {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      let error = err;
      console.log("hello world", err);
      console.log(error.status);
      //   if (error.status === 400) {
      ctx.body = {
        code: 400,
        message: error.message,
      };
      //   }
    }
  };
}
