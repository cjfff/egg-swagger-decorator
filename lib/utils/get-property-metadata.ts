/*
 * @Author: your name
 * @Date: 2021-05-19 12:45:33
 * @LastEditTime: 2021-05-19 16:15:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/utils/get-property-metadata.ts
 */
import { DECORATORS } from "../defineApiProperty";

export function getPropertiesMetaData(obj: FunctionConstructor) {
  const apiOptions = Reflect.getMetadata(
    DECORATORS.API_DESC_METDATA,
    new obj()
  );

  return apiOptions;
}

export const getPropertyClassRefObject = (
  obj: FunctionConstructor,
  isArray = false
) => {
  const key = isArray ? "items" : "schema";
  return {
    type: isArray ? "array" : "object",
    [key]: {
      $ref: `#/definitions/${obj.name}`,
    },
  };
};

export const getPropertyBodyClassRefObject = (obj: FunctionConstructor) => {
  return {
    in: "body",
    schema: {
      $ref: `#/definitions/${obj.name}`,
    },
    name: "body",
    required: true,
    description: "",
  };
};
