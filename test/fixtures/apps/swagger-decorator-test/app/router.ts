/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-05-20 12:30:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/swagger-decorator-test/app/router.ts
 */
import { Application } from "egg";
import { wrapper, makeSwaggerRouter } from "../../../../../lib";

export default (app: Application) => {
  wrapper(app, {
    prefix: "/my-app/api",
    makeSwaggerRouter: false,
  });
  makeSwaggerRouter(app);
};
