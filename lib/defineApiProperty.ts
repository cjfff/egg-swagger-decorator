/*
 * @Author: your name
 * @Date: 2021-05-19 11:46:04
 * @LastEditTime: 2021-05-20 19:35:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/defineApiProperty.ts
 */
import { Type } from "./swaggerJSON";

export const DECORATORS = {
  API_DESC_METDATA: "API_PROPERTY_METADATA",
} as const;

export const schemas = {} as any;

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
