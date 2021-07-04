/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-07-04 22:05:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/validate.ts
 */
import { validate } from "class-validator";
import { getPropertiesMetaData } from './get-property-metadata'
import { ApiPropertyOptions } from "./defineApiProperty";
export class CustomError extends Error {
  /**
   * Constructor
   * @param {string} field the error field in request parameters.
   */
  constructor(field) {
    super(field);
    this["field"] = field;
    this["status"] = 400;
  }
}

const ConvertBase =
  (fn: Function) => (value: any, typeOption: ApiPropertyOptions) => {
    if (typeof value === "undefined") return;

    if (typeOption.isArray && Array.isArray(value)) {
      return value?.map((num) => fn(num));
    }

    return fn(value);
  };

const convertFn = {
  number: ConvertBase(Number),
  string: ConvertBase(String),
  boolean: ConvertBase(Boolean),
};

/**
 * validate the input values
 * @param {Object} input the input object, like request.query, request.body and so on.
 * @param {Object} expect the expect value, Ex: { name: { required: true, type: String }}
 */
export default async function (input, expect) {
  const schema = new expect();

  const typeMaps = getPropertiesMetaData(expect);

  Object.keys(typeMaps).forEach((key) => {
    const typeObject = typeMaps[key];
    const value = input?.[key];
    schema[key] = value
      ? (convertFn[typeObject.type] ?? convertFn[typeObject?.items?.type])?.(value, typeObject)
      : value ?? typeObject?.default;
  });

  let throwErrors: string[] = []

  await validate(schema).then((errors) => {
    const strings = errors.map((item) => {
      return (item.constraints ? Object.values(item.constraints).join('\n') : '') as string;
    });
    throwErrors = strings;
  });

  if (throwErrors.length) {
    throw new CustomError(throwErrors);
  };

  return schema;
}
