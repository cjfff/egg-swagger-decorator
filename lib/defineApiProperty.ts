/*
 * @Author: your name
 * @Date: 2021-05-19 11:46:04
 * @LastEditTime: 2021-05-20 23:46:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/defineApiProperty.ts
 */
import { Type } from "./swaggerJSON";
import { getPropertyClassRefObject } from './utils/get-property-metadata'
import { setPropertiesMetadata } from './utils/set-property-metadata'
import { setClassmetedata } from './utils/set-class-metdata'

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
    setClassmetedata(target, key, apiOptions)
  };
};
