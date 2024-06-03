<template>
  <div class="app">
    <el-backtop :right="20" :bottom="50" />
    <theHeader v-if="memberPage"></theHeader>
    <theBooking v-if="memberPage"></theBooking>
    <RouterView></RouterView>
  </div>
  <div class="footer" v-if="memberPage">
    <theFooter></theFooter>
  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import theHeader from "./components/theHeader.vue";
import theFooter from "./components/theFooter.vue";
import theBooking from "./components/theBooking.vue";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted,ref } from "vue";
import {useRouter} from 'vue-router';

const router=useRouter()

const memberPage=ref(true);
router.beforeEach((to, from, next) => {
  if (to.path === '/member'||to.path === '/member/signup') {
    memberPage.value = false;
  } else {
    memberPage.value = true;
  }
 
  next();
});

onMounted(() =>{
  AOS.init()
})
</script>

<style>
body {
  background-color: rgb(255, 255, 230);
}
html,
body {
  height: 100%;
  margin: 0;
  font-family: "Microsoft JhengHei", 微軟正黑體, Arial, sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
a {
  text-decoration: none;
  color: black;
}
@media screen and (max-width:767px){
  .el-backtop{
    height: 35px;
    width: 35px;
  }
  
}
@media screen and (max-width:414px){
  .el-backtop{
    height: 30px;
    width: 30px;
  }
  
}
</style>
