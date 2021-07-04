/*
 * @Author: your name
 * @Date: 2021-07-04 22:13:01
 * @LastEditTime: 2021-07-04 22:26:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/handleRoute.ts
 */

import { Application, Controller } from "egg";
import * as _ from 'lodash'
import { reqMethods } from "../const";
import { convertPath, validator } from "../middleware";
import { WrapperOptions } from "../utils/swaggerJSON";
import { formatClasses, getPath, loadSwaggerClassesToContext } from "../utils";

const handleMap = (
  app: Application,
  ControllerClass: typeof Controller,
  options: WrapperOptions
) => {
  const { fullPrefix = "" } = options;
  const anonymousContext = app.createAnonymousContext();
  const router = app.router;

  let c: Controller;

  // 扫描的时候有可能不是 controller
  try {
    c = new ControllerClass(Object.assign(anonymousContext));
  } catch (error) {
    return;
  }
  const methods: string[] = Object.getOwnPropertyNames(
    Object.getPrototypeOf(c)
  );
  // remove useless field in class object:  constructor, length, name, prototype
  _.pull(
    methods,
    "name",
    "constructor",
    "length",
    "prototype",
    "pathName",
    "fullPath"
  );
  // map all method in methods
  methods
    // filter methods without @request decorator
    .filter((item) => {
      const { path, method } = c[item];
      if (!path && !method) {
        return false;
      }
      return true;
    })
    // add router
    .forEach((item) => {
      const { path, method } = c[item];
      let { middlewares = [] } = c[item];
      if (typeof middlewares === "function") {
        middlewares = [middlewares];
      }
      if (!Array.isArray(middlewares)) {
        throw new Error("middlewares params must be an array or function");
      }
      middlewares.forEach((item) => {
        if (typeof item !== "function") {
          throw new Error("item in middlewares must be a function");
        }
      });
      if (!reqMethods.includes(method)) {
        throw new Error(`illegal API: ${method} ${path} at [${item}]`);
      }
      const routerPath = getPath(fullPrefix, path)

      const chain = [
        `${convertPath(routerPath)}`,
        validator(c[item].parameters),
        ...middlewares,
        async (ctx) => {
          const c = new ControllerClass(ctx);
          await c[item]();
        },
      ];

      if (options.makeSwaggerRouter || c[item].autoMount) {
        router[method](...chain);
      }
    });
};

const handleRoutes = (app: Application, options: WrapperOptions) => {
  loadSwaggerClassesToContext(app);
  const classes = app.swaggerControllerClasses;

  // read the all controller
  const realClasses = formatClasses(classes);

  // handle all controllers route and their's middreware
  realClasses.forEach((controllerClass) => {
    handleMap(app, controllerClass, options);
  });
};


export default handleRoutes
