<template>
  <div class="member">
    <div class="nav">
      <div class="block" @click="toHome">首頁</div>
      <div class="block" @click="toSignIn">登入</div>
      <div class="block" @click="toSignUp">註冊</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function toHome() {
  router.push({
    path: "/home",
  });
}
function toSignIn(){
    router.push({
        path:"/member"
    })
}
function toSignUp(){
    router.push({
        path:"/member/signup"
    })
}
</script>

<style scoped>
.member {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/member/poster.jpg");
  background-size: cover;
  background-position: bottom;
  color: white;
}
.nav {
  display: flex;
  justify-content: end;
}
.block {
  font-size: 25px;
  margin: 20px;
}
.block:hover {
  cursor: pointer;
}
@media screen and (max-height:600px){
  .member{
    height: 100%;
  }
}
@media screen and (max-width:414px){
  .block{
    margin: 20px 10px;
  }
}
</style>