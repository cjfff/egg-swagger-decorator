/*
 * @Author: your name
 * @Date: 2021-05-19 12:48:30
 * @LastEditTime: 2021-05-19 13:34:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/swagger-decorator-test/test/index.ts
 */

import { TestVo } from "../dto";
export const DECORATORS = {
  API_DESC_METDATA: "API_PROPERTY_METADATA",
} as const;

function getPropertiesMetaData(obj: any) {
  //   Object.getOwnPropertyNames(obj).forEach((key) => {
  //     console.log(key);
  //     if (key === "name") {
  //       console.log(Reflect.getMetadata(DECORATORS.API_DESC_METDATA, key));
  //     }
  //   });
  const object = Reflect.getMetadata(DECORATORS.API_DESC_METDATA, new obj());

  console.log(Reflect.getOwnMetadataKeys(new obj()), "===", object, obj.name);
}

console.log(getPropertiesMetaData(TestVo));
