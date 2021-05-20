/*
 * @Author: your name
 * @Date: 2021-05-20 21:45:50
 * @LastEditTime: 2021-05-20 21:47:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/utils/set-property-metadata.ts
 */
import { schemas } from '../decorator'
import { getPropertiesMetaData } from './get-property-metadata'
import { ApiPropertyOptions } from '../defineApiProperty'

export const setPropertiesMetadata = (value: ApiPropertyOptions) => {
    const apiSchema = {
        type: "object",
        properties: getPropertiesMetaData(
            value.type as FunctionConstructor
        ),
    };
    schemas[(value.type as any).name] = apiSchema;
}