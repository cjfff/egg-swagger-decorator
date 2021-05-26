import * as _ from "lodash";

import { Response } from "./swaggerJSON";
import { ApiPropertyOptions } from "./defineApiProperty";
import {
  getPropertiesMetaData,
  getPropertyBodyClassRefObject,
  getPropertyClassRefObject,
} from "./utils/get-property-metadata";
import { setPropertiesMetadata } from './utils/set-property-metadata'
import { swaggerOptions } from "./wrapper";
/**
 * used for building swagger docs object
 */
const apiObjects = {};
const schemas = {};

const _addToApiObject = (target, name, apiObj, content) => {
  if (content.responses) {
    (Object.values(content.responses) as ApiPropertyOptions[]).forEach(
      (value) => {
        if (typeof value.type === "function") {
          Object.assign(
            value,
            getPropertyClassRefObject(value.type as FunctionConstructor, value.isArray)
          );
          setPropertiesMetadata(value)
        }
      }
    );
  }
  const key = `${target.constructor.name}-${name}`;
  if (!apiObj[key]) {
    apiObj[key] = {};
  }
  Object.assign(apiObj[key], content);
};

const _desc = (type, text) => (target, name, descriptor) => {
  descriptor.value[type] = text;
  _addToApiObject(target, name, apiObjects, { [type]: text });
  return descriptor;
};

const _params = (type, parameters) => (target, name, descriptor) => {
  if (!descriptor.value.parameters) {
    descriptor.value.parameters = {};
  }
  descriptor.value.parameters[type] = parameters;

  // additional wrapper for body
  let swaggerParameters = [] as any;

  if (typeof parameters === "function") {
    switch (type) {
      case "path":
      case "query":
        swaggerParameters = (
          Object.entries(
            getPropertiesMetaData(parameters as FunctionConstructor)
          ) as [string, any][]
        ).map(([name, value]) => {
          return {
            name,
            ...value,
            in: type,
            required: type === "path" ? true : value.reqiured,
          };
        });
        break;
      case "body":
        {
          schemas[parameters.name] = {
            type: "object",
            properties: getPropertiesMetaData(
              parameters as FunctionConstructor
            ),
          };
          swaggerParameters = [
            getPropertyBodyClassRefObject(parameters as FunctionConstructor),
          ];
        }
        break;
      default:
        break;
    }
  }

  _addToApiObject(target, name, apiObjects, { [type]: swaggerParameters });
  return descriptor;
};

/**
 * 
 * @param method 
 * @param path 
 * @param autoMount 自动挂载
 * @returns 
 */
const request =
  (method, path, autoMount = swaggerOptions.defaultRequestMounte) =>
  (target, name, descriptor) => {
    method = _.toLower(method);
    descriptor.value.method = method;
    descriptor.value.path = path;
    descriptor.value.autoMount = autoMount;
    _addToApiObject(target, name, apiObjects, {
      request: { method, path },
      security: [{ ApiKeyAuth: [] }],
    });
    return descriptor;
  };

const middlewares = (val) => (target, name, descriptor) => {
  if (!target || !name) {
    throw new Error();
  }
  descriptor.value.middlewares = val;
  return descriptor;
};


type Class = { new(...args: any[]): any; };

/**
 * 支持直接传递 type
 * @param res
 * @returns
 */
const responses =
  (res?: Response | Class) =>
  (target, name, descriptor) => {
    let resObj = typeof res === 'function' ? { 200: { description: "success", type: res } } : res

    if (!resObj) {
      resObj = { 200: { description: "success" } }
    }

    descriptor.value.responses = res;
    _addToApiObject(target, name, apiObjects, { responses: res });
    return descriptor;
  };
const desc = _.curry(_desc);

// description and summary
const description = desc("description");

const summary = desc("summary");

const tags = desc("tags");

const params = _.curry(_params) as (
  type: string
) => (func: any) => MethodDecorator;

// below are [parameters]

// query params
const query = params("query");

// path params
const path = params("path");

// body params
const body = params("body");

// formData params
const formData = params("formData");

export {
  request,
  summary,
  params,
  desc,
  description,
  query,
  path,
  body,
  tags,
  apiObjects,
  middlewares,
  formData,
  responses,
  schemas,
};
