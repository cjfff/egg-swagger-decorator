/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-05-20 13:32:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/swaggerJSON.ts
 */
import * as _ from "lodash";
import init from "./swaggerTemplate";
import { getPath } from "./utils";
import { getPropertyClassRefObject } from "./utils/get-property-metadata";
/**
 * build swagger json from apiObjects
 */
export interface WrapperOptions {
  title?: string;
  description?: string;
  version?: string;
  prefix?: string;
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
  new (...args: any[]): T;
}

export type IBasicTypes = "string" | "number" | "boolean";
// | 'array'
// | 'date'

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
    title = "API DOC",
    description = "API DOC",
    version = "1.0.0",
    prefix = "",
    swaggerOptions = {},
  } = options;

  const resultJSON = init(title, description, version, swaggerOptions, schemas);

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
      // 返回的时候处理 responses 中的 schema json
      if (value.responses) {
        console.log(value.responses);
        (Object.entries(value.responses) as [string, ResponseItem][]).forEach(
          ([status, value]) => {
            console.log(status, value);
            //  ref 参数复制到 json 中
            if (typeof value.type === "function") {
              Object.assign(
                value,
                getPropertyClassRefObject(value.type as FunctionConstructor, value.isArray)
              );
            }
          }
        );
      }

      // console.log(value.responses);

      const responses: Response = value.responses
        ? value.responses
        : defaultResp;

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
