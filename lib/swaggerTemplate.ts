/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-05-19 14:19:10
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

export default (
  title: string,
  description: string,
  version: string,
  options = {},
  schemas?: any
) =>
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
    options
  );
