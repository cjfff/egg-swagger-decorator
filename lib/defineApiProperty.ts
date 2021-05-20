/*
 * @Author: your name
 * @Date: 2021-05-19 11:46:04
 * @LastEditTime: 2021-05-20 21:29:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/defineApiProperty.ts
 */
import { Type } from "./swaggerJSON";
import { getPropertyClassRefObject, getPropertiesMetaData } from './utils/get-property-metadata'
import { schemas } from './decorator'

export const DECORATORS = {
  API_DESC_METDATA: "API_PROPERTY_METADATA",
} as const;


type ITypes = "number" | "string" | "boolean";
export interface ApiPropertyOptions {
  type?: Type<unknown> | Function | [Function] | ITypes | Record<string, any>;
  isArray?: boolean;
  required?: boolean;
  example?: any;
  description?: string;
  /**
   * 默认值
   */
  default?: any;
}

export const ApiProperty = (
  apiOptions: ApiPropertyOptions = {}
): PropertyDecorator => {
  // @ts-ignore
  return (target, key, descriptor) => {
    const propertiesOptions =
      Reflect.getMetadata(DECORATORS.API_DESC_METDATA, target) || {};

    if (typeof apiOptions.type === 'function') {
      try {
        // 先处理 schema
        const apiSchema = {
          type: "object",
          properties: getPropertiesMetaData(
            apiOptions.type as FunctionConstructor,
          ),
        };
        schemas[(apiOptions.type as any).name] = apiSchema;

        // 写入对象, 因为有可能依赖的不会被挂载，所以互相依赖就挂载一次，稳妥
        Object.assign(apiOptions, getPropertyClassRefObject(apiOptions.type as FunctionConstructor, apiOptions.isArray))
      } catch (error) {
        console.log('解析错误 ref object');
      }
    }

    propertiesOptions[key] = {
      ...(propertiesOptions[key] ?? {}),
      ...apiOptions,
    };

    Reflect.defineMetadata(
      DECORATORS.API_DESC_METDATA,
      propertiesOptions,
      target
    );
  };
};
