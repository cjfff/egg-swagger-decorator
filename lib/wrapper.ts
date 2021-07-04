/*
 * @Author: your name
 * @Date: 2021-07-02 20:50:18
 * @LastEditTime: 2021-07-04 22:23:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/wrapper.ts
 */

import { Application } from "egg";
import * as _ from "lodash";
import { WrapperOptions } from "./utils/swaggerJSON";
import {
  getPath,
  getPort
} from "./utils";
import { handleRoutes } from './core'
import handleSwagger from "./core/handleSwagger";

const swaggerOptions = {} as WrapperOptions;

const wrapper = (app: Application, options?: WrapperOptions) => {
  const opts: WrapperOptions = {
    title: "",
    description: "",
    version: "v1.0.0",
    swaggerJsonEndpoint: "/swagger-json",
    swaggerHtmlEndpoint: "/swagger-html",
    makeSwaggerRouter: true,
  };

  Object.assign(opts, options || {}, {
    fullPrefix: `${options?.swaggerOptions?.basePath ?? ''}${options?.prefix ?? ''}`,
  });
  // 赋值全局 options
  Object.assign(swaggerOptions, opts);

  if (opts.makeSwaggerRouter) {
    handleRoutes(app, opts);
  }

  handleSwagger(app, opts);

  // get the port of the app
  const port = getPort()

  console.log(
    `swagger-html doc listening at ${getPath(`http://127.0.0.1:${port}`, `${opts.fullPrefix}/swagger-html`)}`
  );
};

const makeSwaggerRouter = (app: Application) =>
  handleRoutes(app, swaggerOptions);

export { wrapper, makeSwaggerRouter, swaggerOptions };
