/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-07-04 22:11:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/utils.ts
 */
import { Application, Controller } from "egg";
import * as _path from "path";
import * as _ from "lodash";

const getPath = (prefix: string, path: string) =>
  `${prefix}${path}`.replace("//", "/");

function loadSwaggerClassesToContext(app: Application) {
  const opt = {
    call: false,
    caseStyle: "lower",
    directory: _path.join(app.config.baseDir, "app/controller"),
    typescript: true,
    ignore: "dto/**",
  };
  app.loader.loadToApp(opt.directory, "swaggerControllerClasses", opt);
}

export const flatClasses = (obj) => {
  if (typeof obj !== 'object') return ''
  return _.flattenDeep(
    Object.values(obj).map((item) => {
      return typeof item === "function" ? item : flatClasses(item);
    })
  );
};

export const filterClasses = (classes: typeof Controller[] = []) => {
  return classes.filter((item) => {
    return Object.getPrototypeOf(item).name === Controller.name;
  });
};

export const formatClasses = (obj) => {
  return filterClasses(flatClasses(obj));
};

export const getPort = () => {
  const [, port] = process.env?.npm_lifecycle_script?.match(/--port\s+(\d+)/) ?? []
  return port ?? '7001'
}

export { getPath, loadSwaggerClassesToContext };
