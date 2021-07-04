/*
 * @Author: your name
 * @Date: 2021-07-04 22:07:27
 * @LastEditTime: 2021-07-04 22:09:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/middleware/convertPath.ts
 */


/**
 * eg. /api/{id} -> /api/:id
 * eg. /api//path -> /api/path
 * @param {String} path
 */
export const convertPath = (path) => {
  const re = new RegExp("{(.*?)}", "g");
  return path.replace(re, ":$1").replace(/(\/+)/g, '/');
};
