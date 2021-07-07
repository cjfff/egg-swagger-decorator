# egg-swagger-decorator [npm-url](https://www.npmjs.com/package/egg-swagger-decorator)
> using decorator to auto generate swagger json docs

## Installation


```bash
yarn add @chenxxx/egg-swagger-decorator
```

## Introduction

### egg Swagger Decorator

using decorator to auto generate swagger json docs

based on [Swagger OpenAPI Specification 2.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md)

## Example

```
// using commonds below to start and test the example server

git clone https://github.com/cjfff/egg-swagger-decorator.git

cd egg-swagger-decorator

npm install

npm run dev

finally open:
http://localhost:7001/swagger-html

```

### Requirements

- egg
- typescript > 2.8

### Introduction

```
// router.js
import { Application } from 'egg';
import { wrapper } from '../lib';
export default (app: Application) => {
  wrapper(app, {
    // // [optional] default is /swagger-html
    // swaggerHtmlEndpoint: '/sw',
    // // [optional] default is /swagger-json
    // swaggerJsonEndpoint: '/sj',
    // // [optional] default is false. if true, will call makeSwaggerRouter(app) automatically
    // makeswaggerRouter: false,

    title: 'foo',
    version: 'v1.0.0',
    description: 'bar',
    // autoMount 是否开启
    // defaultRequestMounte: true
  });
};

```

#### using decorator to make api definition

```ts
// controller/test.ts
import { Controller, Context } from "egg";
import {
  request,
  summary,
  path,
  tags,
  responses,
  middlewares,
  description,
} from "@chenxxx/egg-swagger-decorator";
import { PathParamsVO, IGetUserResultVO, IUserListVO } from "../dto";
const testTag = tags(["test"])
export default class Test extends Controller {
  @request("get", "/users")
  @description("get user list")
  @testTag
  @middlewares(async (ctx: Context, next) => {
    ctx.logger.info("mid");
    await next();
  })
  @responses(IUserListVO)
  public async getUsers() {
    const { ctx } = this;
    const users = [{ name: "cjfff" }];
    ctx.body = { users };
  }

  @request("get", "/users/{id}")
  @summary("get user info by id")
  @testTag
  @path(PathParamsVO)
  @responses(IGetUserResultVO)
  public async getUser() {
    const { id } = this.ctx.params;
    this.ctx.body = { id };
  }
}

```

dto define
```ts
// ../dto.ts
export class PathParamsVO {
  @ApiProperty({
    type: "number",
    description: "用户id",
    example: 10086,
  })
  @IsNumber({ maxDecimalPlaces: 1000 }, { message: "id 必须是数字2323232" })
  id: number;
}


export class IUserVO {
  @ApiProperty({
    type: 'string'
  })
  name: string;
}

export class IUserListVO {
  @ApiProperty({
    type: IUserVO,
    isArray: true
  })
  users: IUserVO[]
}


export class IGetUserResultVO {
  @ApiProperty({
    type: 'number'
  })
  id: number;
}
```

#### avaliable annotations:

- tags         
- query
- path
- body
- formData
- middlewares
- summary
- description
- responses

```

request      // @request('POST', '/users')

tags         // @tags(['example'])

query        // @query({limit: {type: 'number', required: true, default: 10, description: 'desc'}})

path         // @path({limit: {type: 'number', required: true, default: 10, description: 'desc'}})

body         // @body({groups: {type: 'array', required: true, items: { type: 'string', example: 'group1' }}})

formData     // @formData({file: {type: 'file', required: true, description: 'file content'}})

middlewares  
// support koa middlewares. 
// eg. @middlewares([func1,func2])

summary      // @summary('api summary')

description  // @description('api description')

responses 
// @responses({ 200: { description: 'success'}, 400: { description: 'error'}})
// responses is optional
```



##### runing the project and it will generate docs through swagger ui

![image.png](https://raw.githubusercontent.com/cjfff/egg-swagger-decorator/master/image/example.png)
## License

 © MIT


[npm-url]: https://npmjs.org/package/@chenxxx/egg-swagger-decorator


thank for https://github.com/Cody2333/egg-swagger-decorator
