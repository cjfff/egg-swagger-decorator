/*
 * @Author: your name
 * @Date: 2021-07-01 23:23:33
 * @LastEditTime: 2021-07-02 00:38:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg-swagger-decorator/test/fixtures/apps/swagger-decorator-test/app/controller/user/index.ts
 */
import { Controller } from 'egg'
import { request, path, responses, tags, body, summary, query } from '../../../../../../../lib'
import * as DTO from './pojo'

const tag = tags(['用户模块'])

export default class UserController extends Controller {

  @tag
  @request('get', '/user/:id')
  @path(DTO.UserPathVO)
  @summary('获取用户详情')
  @responses(DTO.IUserResponse)
  getUserById() {
    const { id } = this.ctx.validatedParams as DTO.UserPathVO

    this.ctx.success({
      id,
      gender: 1,
      name: 'cjfff',
      age: 22
    })
  }

  @tag
  @request('post', '/user')
  @summary('创建用户')
  @body(DTO.ICreateUserParamsVO)
  @responses(DTO.ICreateResponseVO)
  createUser() {
    this.ctx.success(this.ctx.validatedBody)
  }

  @tag
  @request('get', '/user')
  @summary('获取用户列表')
  @query(DTO.IGetUserListQueryVO)
  @responses(DTO.IGetUserListResponseVO)
  getUserList() {
    const query = this.ctx.validatedQuery
    console.log(query);
    this.ctx.success([
      {
        id: 10082,
        gender: 1,
        name: 'cjfff',
        age: 22
      }
    ])
  }

  @tag
  @request('put', '/user/:id')
  @path(DTO.UserPathVO)
  @summary('编辑用户')
  @body(DTO.ICreateUserParamsVO)
  @responses()
  modifyUserById() {
    const body = this.ctx.validatedQuery
    console.log(body);
    this.ctx.success(true)
  }
}
