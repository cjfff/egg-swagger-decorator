/*
 * @Author: your name
 * @Date: 2021-07-01 23:36:05
 * @LastEditTime: 2021-07-02 00:22:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/swagger-decorator-test/app/extend/context.ts
 */

export default {
  success(data: any = null, msg = 'success') {
    (this as any).body = formatResult(0, msg, data);
  },
} as const


function formatResult(code: number, msg: any, data = null) {
  return {
    code,
    msg,
    data,
  };
}
