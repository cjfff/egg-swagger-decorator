/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-07-04 23:23:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/swaggerJSON.ts
 */
import * as _ from "lodash";
import init from "./swaggerTemplate";
import { getPath } from "../utils";
/**
 * build swagger json from apiObjects
 */
export interface WrapperOptions {
  title?: string;
  description?: string;
  version?: string;
  prefix?: string;
  basePath?: string;
  swaggerOptions?: any;
  swaggerJsonEndpoint?: string;
  swaggerHtmlEndpoint?: string;
  makeSwaggerRouter?: boolean;
  /**
   * 是否自动挂载 request
   */
  defaultRequestMounte?: boolean;
  [param: string]: any;
}

export interface Type<T> extends Function {
  new(...args: any[]): T;
}

export type IBasicTypes = "string" | "number" | "boolean";

export interface ResponseItem {
  description?: string;
  type?: Function | IBasicTypes;
  isArray?: boolean;
  required?: boolean;
}

export interface Response {
  [name: number]: ResponseItem;
}
const swaggerJSON = (options: WrapperOptions, apiObjects, schemas: any) => {

  const {
    title = "",
    description = "",
    version = "1.0.0",
    prefix = "",
    swaggerOptions = {},
  } = options;

  const resultJSON = init({
    title, description, version, options, schemas,
    basePath: options.basePath ?? '',
    ...swaggerOptions
  });

  _.chain(apiObjects)
    .forEach((value) => {
      if (!Object.keys(value).includes("request")) {
        throw new Error("missing [request] field");
      }

      const { method } = value.request;
      let { path } = value.request;
      path = getPath(prefix, path); // 根据前缀补全path
      const summary = value.summary ? value.summary : "";
      const apiDescription = value.description ? value.description : summary;
      const defaultResp: Response = {
        200: {
          description: "success",
        },
      };

      let responses: Response = value.responses
        ? value.responses
        : defaultResp;

      Object.keys(responses).forEach(key => {
        if (responses[key].$ref) {
          responses[key] = {
            schema: {
              $ref: responses[key].$ref
            }
          }
        }
      })

      const {
        query = [],
        path: pathParams = [],
        body = [],
        tags,
        formData = [],
        security,
      } = value;

      const parameters = [...pathParams, ...query, ...formData, ...body];

      // init path object first
      if (!resultJSON.paths[path]) {
        resultJSON.paths[path] = {};
      }

      // add content type [multipart/form-data] to support file upload
      const consumes =
        formData.length > 0 ? ["multipart/form-data"] : undefined;

      resultJSON.paths[path][method] = {
        consumes,
        summary,
        description: apiDescription,
        parameters,
        responses,
        tags,
        security,
      };

    })
    .value();

  return resultJSON;
};

export default swaggerJSON;
