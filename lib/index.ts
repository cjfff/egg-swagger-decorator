/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-05-20 20:05:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/index.ts
 */
export { wrapper, makeSwaggerRouter } from "./wrapper";
import "reflect-metadata";

export { ApiProperty } from "./defineApiProperty";
export { CustomError } from './validate'
export * from "class-validator";

export {
  request,
  summary,
  params,
  desc,
  description,
  query,
  path,
  body,
  tags,
  apiObjects,
  middlewares,
  formData,
  responses,
} from "./decorator";
