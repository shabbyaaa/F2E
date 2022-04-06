<template>
  <!-- <h1>{{ data }}</h1>
  <MarkDonw v-model="data" /> -->

  <div class="login">
    <div>
      <label class="login-label">用户名：</label>
      <input v-model="userName" />
    </div>
    <br />
    <div>
      <label class="login-label">密码：</label>
      <input v-model="password" @keyup.enter="handleLogin" />
    </div>

    <button @click="handleLogin" class="login-button">登录</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import MarkDonw from 'components/MarkDonw.vue'

// const data = ref('hello world')

const userName = ref('admin') // 小驼峰
const password = ref('8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92')
const router = useRouter();


function handleLogin () {
  if (userName.value && password.value) {
    login(userName.value, password.value)
    // return router.push({ path: '/' })
  } 
  // alert('请输入用户名或者密码！')
}

const login = (userName, password) => {
  const data = new FormData();
  data.append("userName", userName);
  data.append("password", password);
  data.append("captcha", "fdf3");

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;


  xhr.addEventListener("readystatechange", function() {
    console.log('this :>> ', this);
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("PUT", "/api/user/login");  // http://localhost:8002/user/login
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // xhr.setRequestHeader("Cookie", "test=s%3AsT15asX2ew4OZxy1tShAzQXewy-EkqZR.Md7I7i36xH7k%2F0vaK%2B36F2jJsX1Jyh5p78umRKKnkgc");
  xhr.send(data);
  console.log('data: ', data);
}








</script>


<style scoped>
.login {
  text-align: center;
  width: 400px;
  height: 130px;
  background: #F1F2F3;
}

.login-label {
  width: 70px;
  display: inline-block;
}

.login-button {
  margin-top: 16px;
  width: 200px;
  height: 30px;
  cursor: pointer;
}
</style>