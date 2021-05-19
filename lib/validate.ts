/*
 * @Author: your name
 * @Date: 2021-05-16 22:58:12
 * @LastEditTime: 2021-05-19 17:57:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/validate.ts
 */
import { validate } from "class-validator";
import { getPropertiesMetaData } from './utils/get-property-metadata'
// class InputError extends Error {
//   /**
//    * Constructor
//    * @param {string} field the error field in request parameters.
//    */
//   constructor(field) {
//     super(`incorrect field: '${field}', please check again!`);
//     this["field"] = field;
//     this["status"] = 400;
//   }
// }

class CustomError extends Error {
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

const convertFn = {
  number: Number,
  string: String,
  boolean: Boolean
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
    schema[key] = value ? convertFn[typeObject.type]?.(value) : value;
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
