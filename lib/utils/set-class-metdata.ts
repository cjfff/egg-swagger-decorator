/*
 * @Author: your name
 * @Date: 2021-05-20 23:42:49
 * @LastEditTime: 2021-05-20 23:45:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/lib/utils/set-class-metdata.ts
 */
import { DECORATORS, ApiPropertyOptions } from '../defineApiProperty'
import { getPropertyClassRefObject } from './get-property-metadata';
import { setPropertiesMetadata } from './set-property-metadata';

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