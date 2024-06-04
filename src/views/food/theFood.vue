<template>
  <div class="poster">
    <div class="slogan">太陽初升</div>
    <div class="slogan">萬物煥發生機</div>
    <div class="sub-slogan">The sunrise, bringing forth vitality to all</div>
  </div>
  <div class="topic">
    <h1 data-aos="fade-down" data-aos-duration="1000">美食餐飲</h1>
    <h2 data-aos="fade-down" data-aos-duration="1500">Restaurant</h2>
    <div class="container">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }"
          ><el-icon><House /></el-icon
        ></el-breadcrumb-item>
        <el-breadcrumb-item>曙光餐廳</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title">曙光餐廳</div>
      <div class="sub-title">餐廳理念</div>
      <div class="content">
        曙光餐廳的做菜理念是將日出的美好元素融入菜品中，以新鮮、健康的食材為基礎，融合創意與傳統，烹調出充滿活力和美味的料理。我们注重食材的原汁原味，以精湛的廚藝呈現出每道菜品的獨特風味，讓顧客在用餐的過程中感受到清新、溫暖和美好的氛圍，同時享受到高品質的用餐體驗。
      </div>
      <div class="foods">
        <div
          class="food"
          v-for="(item, index) in items"
          :key="index"
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          <img :src="item.pic" />
        </div>
      </div>
      <div class="restaurant">
        <div class="left" data-aos="fade-right" data-aos-duration="1500">
          <img src="@/assets/food/restaurant.jpg" />
        </div>
        <div class="right" data-aos="fade-left" data-aos-duration="1500">
          <div class="detail">
            <div class="block">早餐時間</div>
            7:00~10:00
          </div>
          <div class="detail">
            <div class="block">午餐時間</div>
            11:00~14:00
          </div>
          <div class="detail">
            <div class="block">晚餐時間</div>
            17:00~20:00
          </div>
          <div class="detail">
            <div class="block">容納桌數</div>
            50桌
          </div>
          <div class="detail">
            <div class="block">消費價位</div>
            每人低消$500元
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 


<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { reactive } from "vue";
import food1 from "@/assets/food/food1.jpg";
import food2 from "@/assets/food/food2.jpg";
import food3 from "@/assets/food/food3.jpg";
import food4 from "@/assets/food/food4.jpg";
import food5 from "@/assets/food/food5.jpg";
import food6 from "@/assets/food/food6.jpg";
import food7 from "@/assets/food/food7.jpg";
import food8 from "@/assets/food/food8.jpg";
import food9 from "@/assets/food/food9.jpg";

const items = reactive([
  { pic: food1 },
  { pic: food2 },
  { pic: food3 },
  { pic: food4 },
  { pic: food5 },
  { pic: food6 },
  { pic: food7 },
  { pic: food8 },
  { pic: food9 },
]);
</script>

<style scoped>
.poster {
  width: 100%;
  height: 400px;
  background-image: url(@/assets/food/poster.jpg);
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
.sub-title {
  font-size: 23px;
  font-weight: bold;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  width: 80%;
  font-size: 20px;
  margin: 20px;
}
.foods {
  width: 75%;
  display: flex;
  flex-wrap: wrap;
}
.food {
  width: 33.3%;
}
img {
  width: 100%;
}
.restaurant {
  width: 75%;
  height: 450px;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.left,
.right {
  width: 50%;
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

.detail {
  font-size: 18px;
  margin: 15px;
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
@media screen and (max-width: 1024px) {
  .title,
  .restaurant {
    width: 90%;
  }
  .foods {
    width: 90%;
  }
  .restaurant {
    height: 100%;
  }
  .right {
    padding: 10px;
  }
  .detail {
    margin: 10px;
  }
  .block {
    margin-right: 10px;
  }
}
@media screen and (max-width: 767px) {
  .poster {
    height: 350px;
  }
  .slogan {
    font-size: 25px;
  }
  .sub-slogan {
    font-size: 16px;
  }
  h1 {
    font-size: 25px;
  }
  h2 {
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
  .restaurant {
    height: 100%;
    flex-direction: column;
  }
  .left,
  .right {
    width: 100%;
  }
  .detail {
    font-size: 16px;
  }
  .block {
    width: 80px;
  }
}
@media screen and (max-width: 414px) {
  .poster {
    height: 300px;
  }
  .slogan {
    font-size: 20px;
  }
  .sub-slogan {
    font-size: 12px;
  }
}
</style>