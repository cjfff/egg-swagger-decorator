/*
 * @Author: your name
 * @Date: 2021-07-04 22:18:07
 * @LastEditTime: 2021-07-04 22:19:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/core/handleSwagger.ts
 */

import { Application } from "egg";
import { apiObjects } from "..";
import { schemas } from "../decorator";
import swaggerHTML from "../utils/swaggerHTML";
import swaggerJSON, { WrapperOptions } from "../utils/swaggerJSON";
import { getPath } from "../utils";


const handleSwagger = (app: Application, options: WrapperOptions) => {
  const {
    fullPrefix = "",
    swaggerJsonEndpoint = "/swagger-json",
    swaggerHtmlEndpoint = "/swagger-html",
  } = options;

  const { router } = app

  const swaggerHtmlEndpointPath = getPath(fullPrefix, swaggerHtmlEndpoint);
  const swaggerJsonEndpointPath = getPath(fullPrefix, swaggerJsonEndpoint);

  // setup swagger router
  router.get(swaggerJsonEndpointPath, async (ctx) => {
    ctx.body = swaggerJSON(options, apiObjects, schemas);
  });

  router.get(swaggerHtmlEndpointPath, async (ctx) => {
    ctx.body = swaggerHTML(swaggerJsonEndpointPath);
  });
};


export default handleSwagger
