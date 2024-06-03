<template>
  <div class="container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }"
        ><el-icon><House /></el-icon
      ></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/room' }"
        >房價一覽表</el-breadcrumb-item
      >
      <el-breadcrumb-item>海景套房</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">海景套房</div>
    <div class="room" v-for="(item, index) in items" :key="index">
      <div class="type" :id=item.id>{{ item.name }}</div>
      <div class="info">
        <div class="left" data-aos="fade-right" data-aos-duration="1500"><img :src="item.pic" /></div>
        <div class="right" data-aos="fade-left" data-aos-duration="1500">
          <div class="detail">
            <div class="block">坪數大小</div>
            {{ item.size }}
          </div>
          <div class="detail">
            <div class="block">入住人數</div>
            {{ item.people }}
          </div>
          <div class="detail">
            <div class="block">床型規格</div>
            {{ item.bed }}
          </div>
          <div class="detail">
            <div class="block">入住時間</div>
            {{ item.checkin }}
          </div>
          <div class="detail">
            <div class="block">退房時間</div>
            {{ item.checkout }}
          </div>
          <div class="detail">
            <div class="block">定價</div>NT$
            {{ item.price }}<br>(假日{{parseInt(item.price)+1000}})
          </div>
          <div class="detail">
            <div class="reserve" @click="toReserve(item)">立即訂位</div>
          </div>
        </div>
      </div>
      <div class="introduce">
        <div class="facility">設施說明</div>
        <div class="items">
          <div class="item" v-for="(product, index) in products" :key="index">
            <el-icon><component :is="product.icon"/></el-icon>
            {{ product.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="back" @click="backRoom">返回列表</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";
import { reactive,onMounted } from "vue";
import oceanPic from "@/assets/room/ocean.jpg";
import oceanPic2 from "@/assets/room/ocean-2.jpg";

//資料
const items = reactive([
  {
    name: "海景雙人套房",
    id:"ocean",
    pic: oceanPic,
    size: "10",
    people: "2人",
    bed: "一大床",
    checkin: "15:00後",
    checkout: "11:00前",
    price: "5000",
  },
  {
    name: "海景四人套房",
    id:"ocean2",
    pic: oceanPic2,
    size: "12",
    people: "4人",
    bed: "兩大床",
    checkin: "15:00後",
    checkout: "11:00前",
    price: "6600",
  },
]);

const products = reactive([
  { name: "迎賓茶包咖啡包" ,icon:"CoffeeCup"},
  { name: "32吋液晶電視" ,icon:"Monitor"},
  { name: "電熱水壺、礦泉水" ,icon:"Mug"},
  { name: "冰箱" ,icon:"Refrigerator"},
  { name: "吹風機" ,icon:"Tools"},
  { name: "乾濕分離衛浴設備" ,icon:"ToiletPaper"},
  { name: "陽台" ,icon:"Sunny"},
  { name: "免費WIFI無線上網" ,icon:"Iphone"},
]);

//路由
const router = useRouter();
function backRoom() {
  router.push({
    path: "/room",
  });
}
function toReserve(item){
  router.push({
    path:"/reserve/calendar",
    query:item
  })
}

//滾動到錨點
const toAnchor = () => {
  const id = sessionStorage.getItem('id');
  if (id) {
    const selectID = document.getElementById(id);
    if (selectID) {
      selectID.scrollIntoView({ behavior: 'smooth' });
    }
    sessionStorage.removeItem('id'); 
  }
};
onMounted(() => {
  toAnchor();
})
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
.type {
  font-size: 25px;
  font-weight: bold;
  margin: 20px;
}
.room {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
  overflow: hidden;
}
.info {
  width: 80%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
}
.left {
  width: 50%;
}
.right {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.detail {
  font-size: 20px;
  margin: 10px 20px;
  display: flex;
  align-items: center;
}
.block {
  background-color: rgb(255, 136, 0);
  padding: 5px;
  margin-right: 20px;
  width: 150px;
  color: white;
  text-align: center;
}
.reserve{
  background-color: rgb(114, 139, 102);
  padding: 5px;
  margin: auto;
  width: 150px;
  color: white;
  text-align: center;
}
.reserve:hover{
  cursor: pointer;
}
img {
  width: 100%;
  height: 100%;

}
.introduce {
  width: 80%;
  display: flex;
  flex-direction: column;
}
.facility {
  margin: 20px;
  font-size: 25px;
  font-weight: bold;
}
.items{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.item {
  width: 40%;
  margin-bottom: 10px;
  font-size: 20px;
}
.back {
  margin: 20px auto 30px;
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
  .block{
    width: 100px;
  }
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
  .info{
    width: 90%;
    flex-direction: column;
  }
  .left,.right{
    width: 100%;
  }
  .detail{
    margin: 5px 15px;
    font-size: 18px;
  }
  .item{
    width: 50%;
    font-size: 16px;
  }
  .back{
    font-size: 18px;
    width: 150px;
    height: 40px;
  }
}
@media screen and (max-width:414px){
  .facility{
    margin: 20px auto;
  }
  .item{
    width:80%
  }
  .detail{
    font-size: 16px;
  }
}
</style>