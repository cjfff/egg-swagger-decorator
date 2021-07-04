/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-07-04 23:22:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/swaggerTemplate.ts
 */
/**
 * init swagger definitions
 * @param {String} title
 * @param {String} description
 * @param {String} version
 * @param {Object} options other options for swagger definition
 */

export default ({
  title,
  description,
  version,
  schemas,
  ...args
}: {
  title: string,
  description: string,
  version: string,
    options: any,
  schemas?: any
  [key: string]: any
}) =>
  Object.assign(
    {
      info: { title, description, version },
      paths: {},
      responses: {},
    },
    {
      definitions: schemas,
      tags: [],
      swagger: "2.0",
      securityDefinitions: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    args
  );
