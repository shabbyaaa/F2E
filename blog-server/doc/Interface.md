## 接口文档

- 获取验证码接口 /validator/img_code

```js
var myHeaders = new Headers();
myHeaders.append("Cache-Control", "no-cache");
myHeaders.append("Accept", "*/*");
myHeaders.append("Accept-Encoding", "gzip, deflate");
myHeaders.append("Connection", "keep-alive");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("localhost:8002/validator/img_code", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

- 登录接口 /user/login

逻辑是先判断验证码captcha是否正确 再验证用户名&密码

```js
var myHeaders = new Headers();
myHeaders.append("Cache-Control", "no-cache");
myHeaders.append("Accept", "*/*");
myHeaders.append("Accept-Encoding", "gzip, deflate");
myHeaders.append("Connection", "keep-alive");

var formdata = new FormData();
formdata.append("userName", "admin");
formdata.append("password", "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92");
formdata.append("captcha", "2122");

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("localhost:8002/user/login", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

- 退出登录 /user/logout

```js

```
