<template>
  <div class="title">
    <h1 data-aos="fade-down" data-aos-duration="1000">客房資訊</h1>
    <h2 data-aos="fade-down" data-aos-duration="1500">Room</h2>
  </div>
  <div class="rooms">
    <div
      class="room"
      v-for="(item, index) in items"
      :key="index"
      @click="route(item.route)"
      data-aos="zoom-in"
      data-aos-duration="1500"
    >
      <div class="cover">
        <el-icon><Plus /></el-icon>
        <div>VIEW DETAIL</div>
      </div>
      <div class="pic"><img :src="item.pic" /></div>
      <div class="content">{{ item.name }}</div>
    </div>
  </div>
  <div class="info" @click="toRoom">VIEW MORE</div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import ocean from "@/assets/home/ocean.jpg";
import luxuary from "@/assets/home/luxuary.jpg";
import classic from "@/assets/home/classic.jpg";
import mountain from "@/assets/home/mountain.jpg";

//資料
const items = reactive([
  { name: "山景套房", pic: mountain, route: "/room/room-mountain" },
  { name: "海景套房", pic: ocean, route: "/room/room-ocean" },
  { name: "經典套房", pic: classic, route: "/room/room-classic" },
  { name: "豪華套房", pic: luxuary, route: "/room/room-luxuary" },
]);

//路由
const router = useRouter();
function toRoom() {
  router.push({
    path: "/room",
  });
}
function route(room) {
  router.push({
    path: room,
  });
}
</script>

<style scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-size: 30px;
  margin: 0;
}
h2 {
  font-size: 20px;
  margin: 0 0 30px 0;
}
.rooms {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.room {
  border: 1px solid black;
  width: 350px;
  height: 450px;
  margin: 10px;
  background-color: rgb(114, 139, 102);
  position: relative;
}
.pic {
  height: 350px;
}
img {
  width: 100%;
}
.content {
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}
.cover {
  height: 350px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  opacity: 0;
  transition: opacity 0.5s;
}
.room:hover {
  cursor: pointer;
}
.room:hover .cover {
  opacity: 1;
}
.room:hover .content {
  color: rgb(114, 139, 102);
}
.el-icon {
  font-size: 50px;
  transition: transform 1s;
}
.room:hover .el-icon {
  transform: rotate(180deg);
}
.info {
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
.info:hover {
  cursor: pointer;
  color: white;
}
.info::after {
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

.info:hover::after {
  transform: scaleX(1);
}

@media screen and (max-width: 767px) {
  .room {
    height: 300px;
    width: 250px;
  }
  .pic {
    height: 250px;
  }
  .cover {
    height: 250px;
    font-size: 20px;
  }
  .content {
    height: 50px;
    font-size: 20px;
  }
}
@media screen and (max-width: 414px) {
  .info {
    font-size: 16px;
    width: 150px;
    height: 40px;
  }
}
</style>