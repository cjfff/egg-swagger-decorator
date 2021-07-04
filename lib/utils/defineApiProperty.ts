/*
 * @Author: your name
 * @Date: 2021-05-19 11:46:04
 * @LastEditTime: 2021-07-04 22:15:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/defineApiProperty.ts
 */
import { Type } from "./swaggerJSON";
import { setClassmetedata } from './set-class-metdata'

export const DECORATORS = {
  API_DESC_METDATA: "API_PROPERTY_METADATA",
} as const;

interface IEnum {
  [id: number]: string
}

type ITypes = "number" | "string" | "boolean";
export interface ApiPropertyOptions {
  type?: Type<unknown> | Function | [Function] | ITypes | Record<string, any>;
  isArray?: boolean;
  required?: boolean;
  example?: any;
  description?: string;
  /**
   * enum 枚举，可以接收枚举类型，或者 number, string
   */
  enum?: (string | number)[] | IEnum;
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
