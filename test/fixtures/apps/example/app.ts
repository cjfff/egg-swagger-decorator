/*
 * @Author: your name
 * @Date: 2021-07-02 00:03:10
 * @LastEditTime: 2021-07-04 21:49:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/example/app.ts
 */

import { Application } from 'egg';
import { wrapper as eggSwaggerInstall } from '../../../../lib'


export default (app: Application) => {
  // register swagger
  eggSwaggerInstall(app, {
    prefix: '/v1',
    description: 'exampleapi',
    swaggerOptions: {
      basePath: '/exampleapi'
    }
  })
}
