/*
 * @Author: your name
 * @Date: 2021-07-04 21:45:55
 * @LastEditTime: 2021-07-04 22:21:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/type.d.ts
 */
import { reqMethods } from './const'

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

export type IMethods = typeof reqMethods[number]

export interface Parameters {
  query?: {};
  path?: {};
  body?: {};
  [param: string]: any;
}
