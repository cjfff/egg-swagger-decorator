/*
 * @Author: your name
 * @Date: 2021-07-01 23:23:42
 * @LastEditTime: 2021-07-02 00:36:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/swagger-decorator-test/app/controller/user/pojo/index.ts
 */

import { ApiProperty, IsString } from "../../../../../../../../lib";


export class UserPathVO {
  @ApiProperty({
    type: 'number',
    description: '用户ID',
    default: 10086
  })
  id: number;
}

export class IUserResponse {
  @ApiProperty({
    type: 'number'
  })
  id: number;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'number' })
  age: number;

  @ApiProperty({
    type: 'number',
    enum: [1, 2],
    description: '1 男， 2 女'
  })
  gender: number;
}


export class ICreateUserParamsVO {
  @ApiProperty({ type: 'string', required: true })
  @IsString({ message: '姓名为必填' })
  name: string;

  @ApiProperty({ type: 'string', required: true, example: '13533247777' })
  @IsString({ message: '手机号为必填' })
  phone: string;
}

export class ICreateResponseVO {
  @ApiProperty({ type: 'number' })
  id: number;
}


export class IGetUserListQueryVO {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string' })
  phone: string;
}


export class IGetUserListResponseVO {
  @ApiProperty({ type: IUserResponse, isArray: true })
  list: IUserResponse[]
}
