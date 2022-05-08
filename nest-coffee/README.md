# Nest官网基础课程

- nest generate controller
- nest g co --no-spec
- nest generate controller module/abc
- nest g interceptor // 拦截器
- nest g mo // module
- nest g co // controller
- nest g pipe // pipe
- nest g middleware //中间件

## CRUD

Create Read Update Delete

## docker

docker-compose up -d

## Others

### Exception Filters 异常过滤器

### Pipes 管道

- transformations: 将输入转换为期望的输出和验证 如果无效则抛出异常

### Guards 守卫

判断给定的请求是否满足某些条件，如身份验证、授权等

### Interceptors 拦截器

- 在方法执行之前或之后绑定额外的逻辑
- 转换方法返回的结果
- 扩展基本方法行为
- 甚至完全覆盖方法 override

范围

1. Global
2. Controller
3. Method
4. param


## swagger

若要显示接口的DTO 需要在`nest-cli`中加入

```json
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": ["@nestjs/swagger/plugin"]
  }
```

解决继承自别的DTO文件导致swagger不能正常显示时用

```ts
// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger'
```

在DTO文件中添加文档属性描述

```ts
  // 此装饰器允许设置各种模式对象属性 如default description等
  @ApiProperty({ description: 'The name of a coffee' })
```

如果要在swagger中添加请求的其他相应 例如403例子 可以使用`ApiResponse`

```ts
  @ApiForbiddenResponse({ description: 'Forbidden' })
```

ApiTags 给router归类 在controller中@ApiTags('coffee')


## 测试 jest

each controller provide service etc should have its own dedicated test file

端到端测试 e2e 放在单独的test文件夹中 命名`e2e-spec.ts` 适合于对整个系统进行高级验证

单元测试侧重于单个类和函数