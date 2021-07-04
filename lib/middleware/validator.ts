/*
 * @Author: your name
 * @Date: 2021-07-04 22:03:07
 * @LastEditTime: 2021-07-04 22:04:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/middleware/validator.ts
 */
import validate from '../utils/validate'
import type { Parameters } from '../type'

export const validator = (parameters: Parameters) => async (ctx, next) => {
  if (!parameters) {
    await next();
    return;
  }

  if (parameters.query) {
    ctx.validatedQuery = await validate(ctx.request.query, parameters.query);
  }
  if (parameters.path) {
    ctx.validatedParams = await validate(ctx.params, parameters.path);
  }
  if (parameters.body) {
    ctx.validatedBody = await validate(ctx.request.body, parameters.body);
  }
  await next();
};
