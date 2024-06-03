<template>
  <div class="title">房型</div>
  <div class="container">
    <div class="room" v-for="(item, index) in items" :key="index">
      <div class="top"><img :src="item.pic" /></div>
      <div class="bottom">
        <div class="name">{{ item.name }}</div>
        <div class="price">NT${{ item.price }}起</div>
        <div class="info" @click="toRoomInfo(item)">詳細資訊</div>
        <div class="reserve" @click="toCalendar(item)">立即訂房</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import ClassicPic from "@/assets/reserve/classic.jpg";
import Classic2Pic from "@/assets/reserve/classic-2.jpg";
import LuxuaryPic from "@/assets/reserve/luxuary.jpg";
import Luxuary2Pic from "@/assets/reserve/luxuary-2.jpg";
import MountainPic from "@/assets/reserve/mountain.jpg";
import Mountain2Pic from "@/assets/reserve/mountain-2.jpg";
import OceanPic from "@/assets/reserve/ocean.jpg";
import Ocean2Pic from "@/assets/reserve/ocean-2.jpg";

//資料
const items = reactive([
  {
    pic: ClassicPic,
    name: "經典雙人套房",
    price:"4000",
    route: "/room/room-classic",
    id: "classic",
  },
  {
    pic: Classic2Pic,
    name: "經典四人套房",
    price:"5600",
    route: "/room/room-classic",
    id: "classic2",
  },
  {
    pic: LuxuaryPic,
    name: "豪華雙人套房",
    price:"6600",
    route: "/room/room-luxuary",
    id: "luxuary",
  },
  {
    pic: Luxuary2Pic,
    name: "豪華四人套房",
    price:"12000",
    route: "/room/room-luxuary",
    id: "luxuary2",
  },
  {
    pic: MountainPic,
    name: "山景雙人套房",
    price:"4600",
    route: "/room/room-mountain",
    id: "mountain",
  },
  {
    pic: Mountain2Pic,
    name: "山景四人套房",
    price:"6200",
    route: "/room/room-mountain",
    id: "mountain2",
  },
  {
    pic: OceanPic,
    name: "海景雙人套房",
    price:"5000",
    route: "/room/room-ocean",
    id: "ocean",
  },
  {
    pic: Ocean2Pic,
    name: "海景四人套房",
    price:"6600",
    route: "/room/room-ocean",
    id: "ocean2",
  },
]);

//路由
const router = useRouter();
function toRoomInfo(item) {
  router.push({
    path: item.route,
  });
  //設置錨點
  sessionStorage.setItem("id", item.id);
}
function toCalendar(item){
  router.push({
    path:'/reserve/calendar',
    query:item
  })
}
</script>

<style scoped>
.title {
  margin: 50px auto;
  width: 80%;
  display: flex;
  justify-content: center;
  padding: 15px 0;
  font-size: 25px;
  font-weight: bold;
  border: 2px solid rgb(114, 139, 102);
}
.container {
  width: 80%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.room {
  width: 40%;
  height: 100%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.3);
}
.top,
.bottom {
 width: 100%;
}
img {
  width: 100%;
}
.bottom {
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.name {
  font-size: 25px;
  font-weight: bold;
}
.price{
  font-size: 25px;
  margin-top: 10px;
}
.info {
  font-size: 20px;
  border: 1px solid black;
  padding: 5px 10px;
  text-align: center;
  margin: 20px;
  background-color: rgba(255, 255, 255, 0.2);
}
.info:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.4);
}
.reserve {
  font-size: 20px;
  background-color: rgba(114, 139, 102);
  padding: 5px 10px;
  color: white;
  text-align: center;
}
.reserve:hover {
  cursor: pointer;
  background-color: rgb(97, 141, 77);
}
@media screen and (max-width:767px){
  .title{
    font-size: 20px;
    margin: 30px auto 20px ;
    padding: 10px 0;
  }
  .room{
    width: 100%;
    margin: 20px 0;
  }
  .bottom{
    padding: 10px;
  }
  .name,.price{
    font-size: 20px;
  }
  .info,.reserve{
    font-size: 18px;
  }
  .info{
    margin: 10px;
  }
}
@media screen and (max-width:414px){
  .title,.container{
    width: 90%;
  }
  .room{
    margin: 10px 0;
  }
  .name,.price{
    font-size: 18px;
  }
  .price{
    margin-top: 5px;
  }
  .info,.reserve{
    font-size: 16px;
  }
}
</style>