import { Application, Controller, Router } from "egg";
import * as _ from "lodash";
import { apiObjects, schemas } from "./decorator";
import swaggerHTML from "./swaggerHTML";
import swaggerJSON from "./swaggerJSON";
import { WrapperOptions } from "./swaggerJSON";
import {
  convertPath,
  getPath,
  loadSwaggerClassesToContext,
  formatClasses,
} from "./utils";
import validate from "./validate";
/**
 * allowed http methods
 */
const reqMethods = ["get", "post", "put", "patch", "delete"];

const swaggerOptions = {} as WrapperOptions;

interface Parameters {
  query?: {};
  path?: {};
  body?: {};
  [param: string]: any;
}

const validator = (parameters: Parameters) => async (ctx, next) => {
  if (!parameters) {
    await next();
    return;
  }

  if (parameters.query) {
    ctx.validatedQuery = await validate(ctx.request.query, parameters.query);
  }
  if (parameters.path) {
    ctx.validatedParams = await validate(ctx.params, parameters.path);
  }
  if (parameters.body) {
    ctx.validatedBody = await validate(ctx.request.body, parameters.body);
  }
  await next();
};

const handleSwagger = (router: Router, options: WrapperOptions) => {
  const {
    prefix = "",
    swaggerJsonEndpoint = "/swagger-json",
    swaggerHtmlEndpoint = "/swagger-html",
  } = options;

  const swaggerHtmlEndpointPath = getPath(prefix, swaggerHtmlEndpoint);
  const swaggerJsonEndpointPath = getPath(prefix, swaggerJsonEndpoint);

  // setup swagger router
  router.get(swaggerJsonEndpointPath, async (ctx) => {
    ctx.body = swaggerJSON(options, apiObjects, schemas);
  });

  router.get(swaggerHtmlEndpointPath, async (ctx) => {
    ctx.body = swaggerHTML(swaggerJsonEndpointPath);
  });
};

declare module "egg" {
  interface Application {
    createAnonymousContext(req?: any): Context;
    swaggerControllerClasses: {};
  }
  interface Context {
    validatedQuery?: {};
    validatedParams?: {};
    validatedBody?: {};
  }
}

const handleMap = (
  app: Application,
  ControllerClass: typeof Controller,
  options: WrapperOptions
) => {
  const { prefix = "" } = options;
  const anonymousContext = app.createAnonymousContext();
  const router = app.router;

  let c: Controller;

  // 扫描的时候有可能不是 controller
  try {
    c = new ControllerClass(Object.assign(anonymousContext));
  } catch (error) {
    return;;
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

      const chain = [
        `${convertPath(getPath(prefix, path))}`,
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


const handleMapDir = (app: Application, options: WrapperOptions) => {
  loadSwaggerClassesToContext(app);
  const classes = app.swaggerControllerClasses;

  const realClasses = formatClasses(classes);

  realClasses.forEach((controllerClass) => {
    handleMap(app, controllerClass, options);
  });
};

const wrapper = (app: Application, options?: WrapperOptions) => {
  const opts: WrapperOptions = {
    title: "API DOC",
    description: "API DOC",
    version: "v1.0.0",
    prefix: "",
    swaggerJsonEndpoint: "/swagger-json",
    swaggerHtmlEndpoint: "/swagger-html",
    makeSwaggerRouter: true,
  };

  Object.assign(opts, options || {});
  // 赋值全局 options
  Object.assign(swaggerOptions, opts);

  const { router } = app;
  if (opts.makeSwaggerRouter) {
    handleMapDir(app, opts);
  }
  
  handleSwagger(router, opts);

  console.log(
    `swagger-html doc listening at ${getPath("http://127.0.0.1:7001/", `${opts.prefix}/swagger-html`)}`
  );
};
const makeSwaggerRouter = (app: Application) =>
  handleMapDir(app, swaggerOptions);
export { wrapper, makeSwaggerRouter, swaggerOptions };
