<template>
  <div class="container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }"
        ><el-icon><House /></el-icon
      ></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news' }">最新消息</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">{{ title }}</div>
    <div class="pic"><img :src="getPic(title)" /></div>
    <div class="content"> 
      <div class="info"><span>活動時間:</span><br>{{ time }}</div>
      <div class="info"><span>活動詳情:</span><br>{{ introduce }}</div>
      <div class="info" v-if="project"><span>專案內容:</span><br><div v-html="project"></div></div>
      <div class="info" v-if="price"><span>優惠價格:</span><br>{{ price }}</div>
    </div>
    <div class="back" @click="backNews">返回列表</div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";
import BBQ from "@/assets/news/BBQ.jpg";
import diving from "@/assets/news/diving.jpg";
import party from "@/assets/news/party.jpg";
import room from "@/assets/news/room.jpg";
import swim from "@/assets/news/swim.jpg";

//獲取路由資料
const route = useRoute();
const title = route.query.title;
const time = route.query.time;
const introduce = route.query.introduce;
const project=route.query.project
const price=route.query.price

//獲取圖片
const getPic = (title) => {
  switch (title) {
    case "加購烤肉優惠":
      return BBQ;
    case "夏季潛水住房專案":
      return diving;
    case "包棟派對專案":
      return party;
    case "全新套房整修完畢":
      return room;
    case "全新泳池閃亮登場":
      return swim;
  }
};

//路由
const router = useRouter();
function backNews() {
  router.push({
    path: "/news",
  });
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-breadcrumb {
  position: absolute;
  top: 0;
  right: 10%;
  font-size: 18px;
}
.title {
  margin: 50px 0;
  width: 80%;
  display: flex;
  justify-content: center;
  padding: 15px 0;
  font-size: 25px;
  font-weight: bold;
  border: 2px solid rgb(114, 139, 102);
}
.pic {
  width: 50%;
  display: flex;
  justify-content: center;
}
img{
  width: 100%;
}
.content {
  width: 50%;
  margin: 30px 0;
}
.info {
  font-size: 20px;
  margin-bottom: 20px;
}
span{
  font-size: 23px;
  font-weight: bold;
}
.back {
  margin: 20px auto 50px;
  position: relative;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  overflow: hidden;
}
.back:hover {
  cursor: pointer;
  color: white;
}
.back::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transition: transform 0.2s ease;
  background-color: black;
  transform-origin: left;
  transform: scaleX(0);
  z-index: -1;
}

.back:hover::after {
  transform: scaleX(1);
}
@media screen and (max-width:1024px){
  .pic,.content{
    width: 70%;
  }
}
@media screen and (max-width:767px) {
  .el-breadcrumb{
    right: 5%;
  }
  .el-breadcrumb__item{
    font-size: 16px;
  }
  .pic,.content{
    width: 80%;
  }
  .title{
    font-size: 20px;
    margin: 30px 0 20px 0;
    padding: 10px 0;
  }
  .info{
    font-size: 18px;
  }
  
@media screen and (max-width:414px){
  span{
    font-size: 20px;
  }
  .info{
    font-size: 16px;
  }
  .back{
    margin: 20px auto;
    width: 150px;
    height: 40px;
    font-size: 18px;
  }
}
}
</style>