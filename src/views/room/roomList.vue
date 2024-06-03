<template>
  <div class="container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }"
        ><el-icon><House /></el-icon
      ></el-breadcrumb-item>
      <el-breadcrumb-item>房價一覽表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">房價一覽表</div>
    <div class="list" >
      <div class="room" v-for="(item, index) in items" :key="index" data-aos="zoom-in" data-aos-duration="1500" >
        <div class="pic"><img :src="item.pic" /></div>
        <div class="content">
          <div class="name">{{ item.name }}</div>
          <div class="info">
            <div class="type">人數</div>
            {{ item.people }}人
          </div>
          <div class="info">
            <div class="type">床型</div>
            {{ item.bed }}
          </div>
          <div class="info">
            <div class="type">坪數</div>
            {{ item.size }}
          </div>
          <div class="info">
            <div class="type">定價</div>
            NT${{ item.price }}起
          </div>
          <div class="detail" @click="route(item)">VIEW MORE</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import classicPic from "@/assets/room/classic.jpg";
import luxuaryPic from "@/assets/room/luxuary.jpg";
import oceanPic from "@/assets/room/ocean.jpg";
import mountainPic from "@/assets/room/mountain.jpg";
import ocean2Pic from "@/assets/room/ocean-2.jpg";
import mountain2Pic from "@/assets/room/mountain-2.jpg";
import classic2Pic from "@/assets/room/classic-2.jpg";
import luxuary2Pic from "@/assets/room/luxuary-2.jpg";

//資料
const items = reactive([
  {
    name: "經典雙人房",
    id:"classic",
    pic: classicPic,
    people: "2",
    bed: "一大床",
    size: "8",
    price: "4000",
    route: "/room/room-classic",
  },
  {
    name: "經典四人房",
    id:"classic2",
    pic: classic2Pic,
    people: "4",
    bed: "兩大床",
    size: "10",
    price: "5600",
    route: "/room/room-classic",
  },
  {
    name: "豪華雙人房",
    id:"luxuary",
    pic: luxuaryPic,
    people: "2",
    bed: "一大床",
    size: "12",
    price: "6600",
    route: "/room/room-luxuary",
  },
  {
    name: "豪華四人房",
    id:"luxuary2",
    pic: luxuary2Pic,
    people: "4",
    bed: "兩大床",
    size: "15",
    price: "12000",
    route: "/room/room-luxuary",
  },
  {
    name: "山景雙人房",
    id:"mountain",
    pic: mountainPic,
    people: "2",
    bed: "一大床",
    size: "10",
    price: "4600",
    route: "/room/room-mountain",
  },
  {
    name: "山景四人房",
    id:"mountain2",
    pic: mountain2Pic,
    people: "4",
    bed: "兩大床",
    size: "12",
    price: "6200",
    route: "/room/room-mountain",
  },
  {
    name: "海景雙人房",
    id:"ocean",
    pic: oceanPic,
    people: "2",
    bed: "一大床",
    size: "10",
    price: "5000",
    route: "/room/room-ocean",
  },
  {
    name: "海景四人房",
    id:"ocean2",
    pic: ocean2Pic,
    people: "4",
    bed: "兩大床",
    size: "12",
    price: "6600",
    route: "/room/room-ocean",
  },
]);

//路由
const router = useRouter();
function route(item) {
  router.push({
    path: item.route,
  });
  //設定錨點
  sessionStorage.setItem("id",item.id)
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
.list {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.room {
  width: 400px;
  height: 100%;
  margin: 30px;
}
.pic {
  height: 300px;
  width: 100%;
}
img {
  width: 100%;
  height: 100%;
}
.content {
  height: 250px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.name {
  width: 100%;
  height: 45px;
  font-size: 25px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.info {
  display: flex;
  align-items: center;
}
.type {
  background-color: rgb(255, 136, 0);
  color: white;
  width: 50px;
  padding: 3px;
  margin: 5px 20px;
  text-align: center;
}
.detail {
  width: 80%;
  height: 35px;
  border: 1px solid black;
  margin: 10px auto ;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgba(255, 255, 255, 0.5);
}

.detail:hover {
  cursor: pointer;
  color: white;
  background-color: transparent;
}
.detail::after {
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

.detail:hover::after {
  transform: scaleX(1);
}
@media screen and (max-width:767px) {
  .el-breadcrumb__item{
    font-size: 16px;
  }
  .title{
    font-size: 20px;
    margin: 30px 0 20px 0;
    padding: 10px 0;
  }
  .name{
    font-size: 20px;
  }
}
@media screen and (max-width:414px){
  .room{
    margin: 15px;
  }
  .pic{
    height: 200px;
  }
  .detail{
    width: 60%;
    height: 30px;
    font-size: 14px;
  }
}
</style>