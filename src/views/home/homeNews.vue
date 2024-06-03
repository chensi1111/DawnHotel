<template>
  <div class="news">
    <h1 data-aos="fade-down" data-aos-duration="1000">最新消息</h1>
    <h2 data-aos="fade-down" data-aos-duration="1500">News</h2>
  </div>
  <el-carousel :interval="4000" :type="carouselType" height="500px">
    <el-carousel-item
      v-for="(item, index) in items"
      :key="index"
      @click="route(item)"
    >
      <div class="cover">
        <el-icon><Plus /></el-icon>
        <div>VIEW DETAIL</div>
      </div>
      <div class="pic"><img :src="item.pic" /></div>
      <div class="content">
        <div class="type">{{ item.type }}</div>
        <div class="wrapper">
          <div class="date">{{ item.date }}</div>
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
  <div class="info" @click="toNews">VIEW MORE</div>
</template>

<script setup>
import { reactive, ref, onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";
import diving from "@/assets/home/diving.jpg";
import party from "@/assets/home/party.jpg";
import room from "@/assets/home/room.jpg";
import swim from "@/assets/home/swim.jpg";
import bbq from "@/assets/home/bbq.jpg";

//輪播圖資料
const items = reactive([
  {
    type: "住房優惠",
    title: "夏季潛水住房專案",
    pic: diving,
    date: "2024/06/15",
    time: "6月15日至9月30日",
    introduce:
      "炎炎夏日，來我們的飯店享受清涼的潛水活動！預訂我們的「夏季潛水住房專案」，即可享受專業潛水教練帶領的潛水體驗，探索海底美麗的世界。",
    project: `三天兩夜的豪華海景房住宿<br>每日早餐<br>專業潛水教練指導及設備租借（包括潛水服、氣瓶、面鏡等）<br>海底攝影服務，留下美好回憶<br>附贈當地特色晚餐一次`,
    price: "NT$12,000/每人（原價 NT$15,000）",
  },
  {
    type: "最新公告",
    title: "全新套房整修完畢",
    pic: room,
    date: "2024/05/07",
    time: "即日起至12月31日",
    introduce:
      "我們的套房經過全新整修，以現代設計風格重新打造，提供您更舒適豪華的住宿體驗。歡迎預訂我們的全新套房，享受奢華的假期。",
    project: `預訂全新套房即享8折優惠<br>免費升級至海景套房（視房況而定）<br>贈送歡迎果盤和紅酒一瓶<br>延遲退房至下午3點`,
  },
  {
    type: "住房優惠",
    title: "包棟派對專案",
    pic: party,
    date: "2023/11/11",
    time: "全年（需提前至少一個月預訂）",
    introduce:
      "無論是生日派對、公司聚會還是朋友聚餐，包棟派對專案都能滿足您的需求。享受獨立空間，不受打擾，盡情狂歡。",
    project: `包棟住宿（最多可容納100人）<br>室內外活動空間使用（包括宴會廳、花園、泳池）<br>派對佈置和音響設備<br>自助餐或燒烤餐點選擇<br>飲品無限暢飲（含酒精飲品）`,
    price: "NT$100,000起（視人數和需求調整）",
  },
  {
    type: "餐飲優惠",
    title: "加購烤肉優惠",
    pic: bbq,
    date: "2023/09/04",
    time: "即日起至10月31日",
    introduce:
      "入住期間加購烤肉套餐，享受豐富美味的戶外燒烤體驗。我們提供最新鮮的食材和全套燒烤設備，讓您和家人朋友一起度過美好的時光。",
    project: `烤肉套餐（含牛肉、雞肉、海鮮、蔬菜等多種選擇）<br>免費使用燒烤設備和場所<br>贈送自製飲料和冰淇淋<br>加購烤肉套餐可享8折優惠`,
    price: "NT$6000/每組（4人份）",
  },
  {
    type: "最新公告",
    title: "全新泳池閃亮登場",
    pic: swim,
    date: "2023/08/22",
    time: "即日起至9月30日",
    introduce:
      "我們的全新泳池正式開放！歡迎來體驗清澈見底的泳池設施，享受陽光和水的完美結合。來入住我們的房間，即可免費使用全新泳池。",
    project: `入住兩晚即贈送免費泳池飲品券兩張<br>參加泳池邊瑜伽課程（每日早晨）<br>免費使用泳池周邊設施（包括躺椅、遮陽傘、毛巾）<br>專屬兒童戲水區和大人休閒區`,
  },
]);

//根據視窗大小改變輪播圖
const carouselType = ref("card");
const checkWindowSize = () => {
  carouselType.value = window.innerWidth < 767 ? "string" : "card";
  console.log("check");
};

onMounted(() => {
  checkWindowSize();
  window.addEventListener("resize", checkWindowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkWindowSize);
});

//路由
const router = useRouter();
function toNews() {
  router.push({
    path: "/news",
  });
}
function route(item) {
  router.push({
    path: "/news/info",
    query: {
      title: item.title,
      introduce: item.introduce,
      project: item.project,
      price: item.price,
      time: item.time,
    },
  });
}
</script>

<style scoped>
.news {
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
.el-carousel__item {
  background-color: rgb(114, 139, 102);
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
.el-icon {
  font-size: 50px;
  transition: transform 1s;
}
.el-carousel__item:hover .cover {
  opacity: 1;
}
.el-carousel__item:hover .el-icon {
  transform: rotate(180deg);
}
.pic {
  height: 350px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.content {
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.type {
  width: 150px;
  height: 40px;
  background-color: rgb(255, 195, 30);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}
.wrapper {
  width: 80%;
  height: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
}
.date {
  font-size: 18px;
  margin: 5px 10px;
}
.title {
  font-size: 20px;
  margin: 0 10px;
  font-weight: bold;
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
  z-index: 20;
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

@media screen and (max-width: 414px) {
  ::v-deep .el-carousel__button {
    width: 15px;
  }
  .el-carousel {
    height: 350px;
  }
  .pic {
    height: 250px;
  }
  .cover {
    height: 250px;
    font-size: 18px;
  }
  .content {
    height: 100px;
  }
  .type {
    height: 30px;
    margin-bottom: 5px;
  }
  .wrapper {
    height: 100%;
  }
  .date{
    font-size: 14px;
  }
  .titel {
    font-size: 16px;
  }
  .info {
    font-size: 16px;
    width: 150px;
    height: 40px;
  }
}
</style>