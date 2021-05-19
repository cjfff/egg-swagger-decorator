/*
 * @Author: your name
 * @Date: 2021-05-17 00:10:28
 * @LastEditTime: 2021-05-19 16:38:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/swagger-decorator-test/app/dto/index.ts
 */
import { Length, IsOptional, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "../../../../../../lib";

export class TestDto {
  @Length(10, 20)
  @IsOptional()
  @ApiProperty({
    type: "string",
    description: "标题",
    example: "hello",
  })
  title?: string;

  @ApiProperty({
    type: "number",
    description: "id",
    example: 10086,
    required: true,
  })
  @IsNumber({ maxDecimalPlaces: 1000 }, { message: "id 必须是数字" })
  id?: number;

  @ApiProperty({
    type: "string",
    description: "abc 是字符串",
    example: "abcdefcg",
  })
  @IsString({ message: "abc 不能为空" })
  abc?: string;
}

export class TestVo {
  @ApiProperty({
    type: "string",
    description: "test",
    example: 1000,
  })
  id: number;
}

export class PathParamsVo {
  @ApiProperty({
    type: "number",
    description: "用户id",
    example: 10086,
  })
  @IsNumber({ maxDecimalPlaces: 1000 }, { message: "id 必须是数字2323232" })
  id: number;
}
