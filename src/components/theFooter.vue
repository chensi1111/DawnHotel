<template>
  <div class="footer">
    <div class="nav-container">
      <div class="nav" @click="toNews">最新消息</div>
      <div class="nav" @click="toAbout">關於我們</div>
      <div class="nav" @click="toRoom">房型介紹</div>
      <div class="nav" @click="toFacility">休閒設施</div>
      <div class="nav" @click="toFood">美食餐飲</div>
      <div class="nav" @click="toTrafic">交通資訊</div>
    </div>
    <div class="bottom">
      <div class="left" @click="toHome">
        <img src="@/assets/logo.png" />
      </div>
      <div class="right">
        <a class="info" href="tel:0212345678">電話:02-1234-5678</a>
        <a class="info" href="https://www.google.com/maps/dir//%E5%8F%B0%E5%8C%97101" target="_blank">地址:台北市台北區台北街1號</a>
        <a class="info" href="mailto:example@gmail.com">信箱:example@gmail.com</a>
        <div class="icons">
          <a class="icon" href="https://www.facebook.com/" target="_blank"
            ><img src="@/assets/facebook.png"
          /></a>
          <a class="icon" href="https://www.instagram.com/" target="_blank"
            ><img src="@/assets/instagram.png"
          /></a>
          <a class="icon" href="https://twitter.com/" target="_blank"
            ><img src="@/assets/twitter.png"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function toNews() {
  router.push({
    path: "/news",
  });
}
function toAbout() {
  router.push({
    path: "/about",
  });
}
function toRoom() {
  router.push({
    path: "/room",
  });
}
function toFacility() {
  router.push({
    path: "/facility",
  });
}
function toFood() {
  router.push({
    path: "/food",
  });
}
function toTrafic() {
  router.push({
    path: "/trafic",
  });
}
function toHome(){
  router.push({
    path:'/'
  })
}
</script>
<style scoped>
.footer {
  height: 250px;
  border-top: 3px solid black;
}
.nav-container {
  display: flex;
  justify-content: center;
  padding: 30px 0;
  border-bottom: 3px solid black;
}
.nav {
  font-size: 25px;
  border-right: 3px solid black;
  padding: 0 30px;
}
.nav:hover {
  cursor: pointer;
  font-weight: bold;
}
.bottom {
  height: 100%;
  display: flex;
}
.left {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left:hover{
  cursor: pointer;
}
.right {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.info {
  font-size: 20px;
  margin: 5px;
}
.icons {
  display: flex;
}
.icon {
  margin: 10px;
}
.icon:hover {
  cursor: pointer;
}
@media screen and (max-width:1024px){
  .nav{
    font-size: 20px;
    padding: 0 15px;
  }
  .bottom{
    flex-direction: column;
    align-items: center;
  }
  .right{
    align-items: center;
  }
  .right,.icons{
    margin-top: 20px;
   }
}
@media screen and (max-width:767px){
  .nav-container{
    display: none;
  }
  .bottom{
    margin: 30px 0;
  }
  img{
    width: 80%;
  }
  .right,.left{
    width: 100%;
  }
  .icons{
    margin-bottom: 50px;
  }
}
@media screen and (max-width:414px){
  .info{
    font-size: 16px;
  }
  
}
</style>