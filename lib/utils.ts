/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-05-26 18:24:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/utils.ts
 */
import { Application, Controller } from "egg";
import * as _path from "path";
import * as _ from "lodash";
/**
 * eg. /api/{id} -> /api/:id
 * @param {String} path
 */
const convertPath = (path) => {
  const re = new RegExp("{(.*?)}", "g");
  return path.replace(re, ":$1");
};

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

export { convertPath, getPath, loadSwaggerClassesToContext };
