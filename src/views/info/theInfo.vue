<template>
  <div class="container">
    <div class="side-nav">
      <div class="welcome">您好 {{ name }}</div>
      <div class="nav" @click="toList">
        <el-icon><Search /></el-icon>訂單查詢
      </div>
      <div class="nav" @click="toSetting">
        <el-icon><Tools /></el-icon>修改資料
      </div>
    </div>
    <router-view @updateName="updateName"></router-view>
  </div>
</template>
  
  
  <script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref} from "vue";

//獲取用戶名
const name = ref("");
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    name.value = user.displayName;
  }
});

//接收infoSetting更改用戶名
function updateName(value){
  name.value=value
}

//路由
const router = useRouter();
function toList() {
  router.push({
    path: "/info/list",
  });
}
function toSetting() {
  router.push({
    path: "/info/setting",
  });
}
</script>
  
<style scoped>
.container {
  display: flex;
  height: 100%;
  border-top: 2px solid black;
}
.side-nav {
  width: 20%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
  border-right: 2px solid rgba(128, 128, 128);
}
.welcome {
  font-size: 18px;
  padding: 25px;
  display: flex;
  justify-content: center;
  color: blue;
  border-bottom: 1px solid black;
}
.nav {
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid black;
}
.nav:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.8);
  color: blue;
}
.el-icon {
  margin: 5px;
}
@media screen and (max-width:1024px){
  .welcome{
    padding: 25px 10px;
  }
  .nav{
    font-size: 18px;
  }
}
@media screen and (max-width:767px){
  .side-nav{
    width: 100px;
  }
  .nav,.welcome{
    writing-mode: vertical-lr;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    font-size: 18px;
  }
}
@media screen and (max-width:414px){
  .side-nav{
    width: 75px;
  }
}
</style>