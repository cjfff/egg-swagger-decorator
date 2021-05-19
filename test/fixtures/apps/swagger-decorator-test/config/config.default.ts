/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-05-17 00:47:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/swagger-decorator-test/config/config.default.ts
 */
"use strict";

import { EggAppConfig } from "egg";

export default (appInfo: EggAppConfig) => {
  const config: any = {};

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1523508510075_3084";

  // add your config here
  config.middleware = ["errorHandler"];

  config.security = {
    csrf: { enable: false },
  };
  return config;
};
