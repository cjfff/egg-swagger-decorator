/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-07-04 22:28:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/index.ts
 */
import "reflect-metadata";
export { wrapper, makeSwaggerRouter } from "./wrapper";

export { ApiProperty } from "./utils/defineApiProperty";
export { CustomError } from './utils/validate'
export * from "class-validator";
export * from "./decorator";
