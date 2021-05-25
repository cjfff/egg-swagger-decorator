/*
 * @Author: your name
 * @Date: 2021-05-20 23:42:49
 * @LastEditTime: 2021-05-25 19:42:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/utils/set-class-metdata.ts
 */
import { DECORATORS, ApiPropertyOptions } from '../defineApiProperty'
import { getPropertyClassRefObject, getPropertyClassTypeObject } from './get-property-metadata';
import { setPropertiesMetadata } from './set-property-metadata';
import { $enum } from 'ts-enum-util'

export const setClassmetedata = (target: FunctionConstructor, key: string, apiOptions: ApiPropertyOptions) => {
    const propertiesOptions =
        Reflect.getMetadata(DECORATORS.API_DESC_METDATA, target) || {};

    if (typeof apiOptions.type === 'function') {
        try {
            // 先处理 schema
            setPropertiesMetadata(apiOptions)

            // 写入对象, 因为有可能依赖的不会被挂载，所以互相依赖就挂载一次，稳妥
            Object.assign(apiOptions, getPropertyClassRefObject(apiOptions.type as FunctionConstructor, apiOptions.isArray))
        } catch (error) {
            console.log('解析错误 ref object');
        }
    }

    // 处理字符串的数组类型
    if (typeof apiOptions.type === 'string' && apiOptions.isArray) {
        Object.assign(apiOptions, getPropertyClassTypeObject(apiOptions.type, apiOptions.isArray))
    }

    /**
     * 处理枚举类型
     */
    if (typeof apiOptions.enum === 'object' && !Array.isArray(apiOptions.enum)) {
        apiOptions.enum = $enum(apiOptions.enum).getValues()
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
}