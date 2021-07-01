/*
 * @Author: your name
 * @Date: 2021-07-02 00:03:10
 * @LastEditTime: 2021-07-02 00:27:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/example/app.ts
 */

import { Application } from 'egg';
import { wrapper as eggSwaggerInstall } from '../../../../lib'


export default (app: Application) => {
  // register swagger
  eggSwaggerInstall(app, {
    prefix: '/exampleapi/1',
    description: 'exampleapi'
  })
}
