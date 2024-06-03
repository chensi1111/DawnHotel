<template>
  <div class="poster">
    <div class="slogan">黎明之翼</div>
    <div class="slogan">引領追尋夢想的旅程</div>
    <div class="sub-slogan">
      The Wing of Dawn, Guiding the Journey of Dreams
    </div>
  </div>
  <div class="topic">
    <h1 data-aos="fade-down" data-aos-duration="1000">交通資訊</h1> 
    <h2 data-aos="fade-down" data-aos-duration="1500">Traffic</h2>
    <router-view></router-view>
  </div>
  <div class="container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }"
        ><el-icon><House /></el-icon
      ></el-breadcrumb-item>
      <el-breadcrumb-item>交通資訊</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">交通資訊</div>
    <div class="mode" v-for="(item, index) in items" :key="index">
      <div class="left" data-aos="fade-right" data-aos-duration="1500"><img :src="item.pic" /></div>
      <div class="right" data-aos="fade-left" data-aos-duration="1500">
        <div class="theme">
          {{ item.theme }}
          <hr />
        </div>
        <div class="info">{{ item.info }}</div>
        <div class="detail" v-if="item.shuttle">
          <div class="block">{{ item.shuttle }}</div>
          {{ item.shuttleInfo }}
        </div>
        <div class="detail" v-if="item.taxi">
          <div class="block">{{ item.taxi }}</div>
          {{ item.taxiInfo }}
        </div>
        <div class="detail" v-if="item.bus">
          <div class="block">{{ item.bus }}</div>
          {{ item.busInfo }}
        </div>
      </div>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1684.5694849102877!2d115.26559725540608!3d-8.69343210687459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd214573b2294d5%3A0x33316987ae56a9ce!2sKarang%20Beach!5e0!3m2!1szh-TW!2stw!4v1715504551508!5m2!1szh-TW!2stw"
      height="450"
      style="border: 0"
      allowfullscreen="true"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>


<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { reactive } from "vue";
import drivePic from "@/assets/traffic/drive.jpg";
import busPic from "@/assets/traffic/bus.jpg";

const items = reactive([
  {
    pic: drivePic,
    theme: "自行開車",
    info: "從太陽大道出發，沿著光明高速公路向南行駛，直到看到第三個出口。從出口處向左轉，然後沿著大道一直行駛，直到看到第一個十字路口。在十字路口向右轉，然後沿著該路一直行駛約兩公里，您將會看到飯店的大門位於您右手邊。",
  },
  {
    pic: busPic,
    theme: "大眾運輸",
    info: "在陽光火車站下車即可轉乘其他大眾運輸工具",
    taxi: "計程車",
    taxiInfo: "車程約20分鐘，車資約200元",
    bus: "客運",
    busInfo: "車程約30分鐘，車資約150元",
    shuttle: "接駁車",
    shuttleInfo: "車程約30分鐘，免費載客服務",
  },
]);
</script>

<style scoped>
.poster {
  width: 100%;
  height: 450px;
  background-image: url(@/assets/traffic/poster.jpg);
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.slogan {
  font-size: 35px;
  color: white;
  text-shadow: 1px 1px black;
  letter-spacing: 10px;
  font-style: italic;
}
.sub-slogan {
  font-size: 25px;
  color: white;
  text-shadow: 1px 1px black;
  font-style: italic;
}
.topic {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
h1 {
  font-size: 35px;
  margin: 0;
  margin-top: 50px;
}
h2 {
  font-size: 25px;
  margin: 0;
  margin-bottom: 30px;
}
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

img {
  width: 100%;
  height: 100%;
}
.mode {
  width: 80%;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 20px;
  display: flex;
  overflow: hidden;
}
.left,
.right {
  width: 50%;
  height: 100%;
}
.left {
  display: flex;
  justify-content: center;
}
img {
  display: block;
}

.right {
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
hr {
  border: 1px dashed black;
}
.theme {
  font-size: 25px;
  font-weight: bold;
}
.info {
  font-size: 20px;
  margin: 0 20px;
}
.detail {
  font-size: 18px;
  margin: 15px;
  display: flex;
  align-items: center;
}
.block {
  background-color: rgb(255, 136, 0);
  padding: 5px;
  margin-right: 15px;
  width: 100px;
  color: white;
  text-align: center;
}
iframe {
  width: 80%;
  margin: 30px;
}
@media screen and (max-width:1024px){
  .title,.mode,iframe{
    width: 90%;
  }
  .mode{
    height: 100%;
  }
  .right{
    padding: 10px;
  }
  .detail{
    margin: 10px;
  }
  .block{
    margin-right: 10px;
  }
}
@media screen and (max-width:767px){
  .poster{
    height: 350px;
  }
  .slogan{
    font-size: 25px;
  }
  .sub-slogan{
    font-size: 16px;
  }
  h1{
    font-size: 25px;
  }
  h2{
    font-size: 20px;
  }
  .el-breadcrumb__item {
    font-size: 16px;
  }
  .title {
    font-size: 20px;
    margin: 30px 0 20px 0;
    padding: 10px 0;
  }
  .content {
    font-size: 18px;
  }
  .mode {
    height: 100%;
    flex-direction: column;
  }
  .left,
  .right {
    width: 100%;
  }
  .info{
    font-size: 18px;
  }
  .detail {
    font-size: 16px;
  }
  .block {
    width: 80px;
  }
}
@media screen and (max-width:414px){
  .poster{
    height: 300px;
  }
  .slogan{
    font-size: 20px;
  }
  .sub-slogan{
    font-size: 12px;
  }
  .info{
    margin: 0 5px;
  }
  .detail{
    margin: 10px 5px;
  }
  .block{
    width: 70px;
  }
  iframe{
    height: 350px;
  }
}
</style>