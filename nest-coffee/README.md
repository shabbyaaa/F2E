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
