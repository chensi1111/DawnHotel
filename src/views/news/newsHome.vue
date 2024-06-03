<template>
  <div class="container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }"
        ><el-icon><House /></el-icon
      ></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news' }">最新消息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="table">
      <div class="topic">主題</div>
      <hr />
      <div
        class="content"
        v-for="(item, index) in items"
        :key="index"
        :class="{ odd: index % 2 === 0, even: index % 2 !== 0 }"
        @click="route(item)"
      >
        <div class="type">
          <div class="block">{{ item.type }}</div>
        </div>
        <div class="title" data-aos="fade-left" data-aos-duration="1500">
          {{ item.title }}
        </div>
        <div class="date">{{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

//資料
const items = reactive([
  {
    type: "住房優惠",
    title: "夏季潛水住房專案",
    date: "2024/06/15",
    time:"6月15日至9月30日",
    introduce:
      "炎炎夏日，來我們的飯店享受清涼的潛水活動！預訂我們的「夏季潛水住房專案」，即可享受專業潛水教練帶領的潛水體驗，探索海底美麗的世界。",
    project: `三天兩夜的豪華海景房住宿<br>每日早餐<br>專業潛水教練指導及設備租借（包括潛水服、氣瓶、面鏡等）<br>海底攝影服務，留下美好回憶<br>附贈當地特色晚餐一次`,
    price: "NT$12,000/每人（原價 NT$15,000）",
  },
  {
    type: "最新公告",
    title: "全新套房整修完畢",
    date: "2024/05/07",
    time:"即日起至12月31日",
    introduce:
      "我們的套房經過全新整修，以現代設計風格重新打造，提供您更舒適豪華的住宿體驗。",
    project: `預訂全新套房即享8折優惠<br>免費升級至海景套房（視房況而定）<br>贈送歡迎果盤和紅酒一瓶<br>延遲退房至下午3點`,
  },
  {
    type: "住房優惠",
    title: "包棟派對專案",
    date: "2023/11/11",
    time:"全年（需提前至少一個月預訂）",
    introduce:
      "無論是生日派對、公司聚會還是朋友聚餐，包棟派對專案都能滿足您的需求。享受獨立空間，不受打擾，盡情狂歡。",
    project: `包棟住宿（最多可容納100人）<br>室內外活動空間使用（包括宴會廳、花園、泳池）<br>派對佈置和音響設備<br>自助餐或燒烤餐點選擇<br>飲品無限暢飲（含酒精飲品）`,
    price: "NT$100,000起（視人數和需求調整）",
  },
  {
    type: "餐飲優惠",
    title: "加購烤肉優惠",
    date: "2023/09/04",
    time:"即日起至10月31日",
    introduce:
      "入住期間加購烤肉套餐，享受豐富美味的戶外燒烤體驗。我們提供最新鮮的食材和全套燒烤設備，讓您和家人朋友一起度過美好的時光。",
    project: `烤肉套餐（含牛肉、雞肉、海鮮、蔬菜等多種選擇）<br>免費使用燒烤設備和場所<br>贈送自製飲料和冰淇淋<br>加購烤肉套餐可享8折優惠`,
    price: "NT$6000/每組（4人份）",
  },
  {
    type: "最新公告",
    title: "全新泳池閃亮登場",
    date: "2023/08/22",
    time:"即日起至9月30日",
    introduce:
      "我們的全新泳池正式開放！歡迎來體驗清澈見底的泳池設施，享受陽光和水的完美結合。來入住我們的房間，即可免費使用全新泳池。",
    project: `入住兩晚即贈送免費泳池飲品券兩張<br>參加泳池邊瑜伽課程（每日早晨）<br>免費使用泳池周邊設施（包括躺椅、遮陽傘、毛巾）<br>專屬兒童戲水區和大人休閒區`,
  },
]);

//路由
const router = useRouter();
function route(item) {
  router.push({
    path: "/news/info",
    query: {
      title: item.title,
      introduce: item.introduce,
      project: item.project,
      price: item.price,
      time:item.time
    },
  });
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.table {
  width: 80%;
  padding: 50px;
  margin: 50px 0;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.2);
}
.topic {
  font-size: 25px;
  font-weight: bold;
  width: 15%;
  display: flex;
  justify-content: center;
  letter-spacing: 10px;
}
.content {
  display: flex;
  height: 50px;
  overflow: hidden;
}
.content:hover {
  cursor: pointer;
}
.content:hover .title {
  color: rgb(255, 136, 0);
}
.type {
  font-size: 18px;
  width: 15%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.block {
  background-color: rgb(255, 136, 0);
  padding: 5px;
  color: white;
}
.title {
  font-size: 25px;
  width: 70%;
  box-sizing: border-box;
  padding-left: 50px;
  display: flex;
  align-items: center;
}
.date {
  font-size: 20px;
  width: 15%;
  margin-right: 10px;
  display: flex;
  justify-content: end;
  align-items: center;
}
.odd {
  background-color: rgb(255, 255, 230);
}
.even {
  background-color: transparent;
}
.el-breadcrumb {
  position: absolute;
  top: 0;
  right: 10%;
  font-size: 18px;
}
@media screen and (max-width:1024px){
  .table{
    padding: 25px;
  }
  .topic,.type{
    width: 20%;
  }
}
@media screen and (max-width:767px){
  .table{
    width: 90%;
    padding: 10px;
  }
  .topic{
    font-size: 20px;
  }
  .type{
    width: 25%;
    font-size: 14px;
  }
  .title{
    padding-left: 15px;
    font-size: 18px;
  }
  .date{
    font-size: 14px;
  }
  .el-breadcrumb{
    right: 5%;
  }
  .el-breadcrumb__item{
    font-size: 16px;
  }
}
@media screen and (max-width:414px){
  .table{
    width: 95%;
    padding: 5px;
  }
  .topic{
    width: 30%;
  }
  .title{
    padding-left: 3px;
    font-size: 16px;
  }
  .type{
    font-size: 12px;
  }
  .date{
    font-size: 12px;
    margin-right: 3px;
  }
  
 
}
</style>