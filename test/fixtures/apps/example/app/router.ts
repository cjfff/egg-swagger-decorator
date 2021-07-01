/*
 * @Author: your name
 * @Date: 2021-07-02 00:00:54
 * @LastEditTime: 2021-07-02 00:10:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/example/app/router.ts
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
};
