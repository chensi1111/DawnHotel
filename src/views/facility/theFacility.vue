<template>
  <div class="poster">
    <div class="slogan">曙光初現</div>
    <div class="slogan">懷抱新的希冀</div>
    <div class="sub-slogan">The light of dawn emerges, embracing new hopes</div>
  </div>
  <div class="topic">
    <h1 data-aos="fade-down" data-aos-duration="1000">休閒設施</h1>
    <h2 data-aos="fade-down" data-aos-duration="1500">Facility</h2>
    <div class="container">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }"
          ><el-icon><House /></el-icon
        ></el-breadcrumb-item>
        <el-breadcrumb-item>設施介紹</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title">設施介紹</div>
      <div class="facility" v-for="(item, index) in items" :key="index">
        <div class="left" data-aos="fade-right" data-aos-duration="1500">
          <img :src="item.pic" />
        </div>
        <div class="right" data-aos="fade-left" data-aos-duration="1500">
          <div class="theme">
            {{ item.theme }}
            <hr />
          </div>
          <div class="info">{{ item.info }}</div>
          <div class="detail">
            <div class="block">開放時間</div>
            {{ item.time }}
          </div>
          <div class="detail">
            <div class="block">地點</div>
            {{ item.place }}
          </div>
          <div class="detail">
            <div class="block">費用</div>
            {{ item.price }}
          </div>
          <div class="detail">
            <div class="block">備註</div>
            {{ item.remark }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { reactive } from "vue";
import TableTennis from "@/assets/facility/table-tennis.jpg";
import Badminton from "@/assets/facility/badminton.jpg";
import Gym from "@/assets/facility/gym.jpg";
import KTV from "@/assets/facility/KTV.jpg";
import Tea from "@/assets/facility/tea.jpg";
import Child from "@/assets/facility/child.jpg";

const items = reactive([
  {
    pic: TableTennis,
    theme: "桌球區",
    info: "您可以享受挑戰您球技的樂趣，與朋友和家人一同娛樂，度過愉快的時光。",
    time: "8:00~21:00(需預約)",
    place: "A棟廣場",
    price: "免費",
    remark: "場地預約時間為2小時",
  },
  {
    pic: Badminton,
    theme: "羽球區",
    info: "您可以盡情揮灑汗水，享受挑戰自己的快節奏比賽，或者與朋友一起享受健康的休閒活動。",
    time: "8:00~21:00(需預約)",
    place: "A棟廣場",
    price: "免費",
    remark: "場地預約時間為2小時",
  },
  {
    pic: Gym,
    theme: "健身房",
    info: "我們的健身房配備了先進的器材，提供各種運動設施和指導員，幫助您實現健康目標，塑造健康體態。",
    time: "8:00~21:00",
    place: "A棟健身房",
    price: "50元/小時",
    remark: "請自行攜帶毛巾",
  },
  {
    pic: KTV,
    theme: "KTV包廂",
    info: "在我們獨特的KTV包廂中，您可以享受到高品質的音響設備，輕鬆歌唱，和朋友家人一起度過難忘的歡樂時光。",
    time: "8:00~24:00(需預約)",
    place: "B棟會議廳",
    price: "500元/小時",
    remark: "嘔吐需負擔額外清潔費",
  },
  {
    pic: Tea,
    theme: "泡茶區",
    info: "您可以品嚐各種茶類，放鬆身心，享受一段寧靜愉悅的時光，與朋友分享生活點滴。",
    time: "8:00~21:00",
    place: "C棟活動教室A",
    price: "免費",
    remark: "免費提供茶葉",
  },
  {
    pic: Child,
    theme: "兒童遊戲區",
    info: "我們的兒童遊戲區提供了安全而有趣的遊戲設施，讓小朋友們在這裡盡情嬉戲。",
    time: "8:00~21:00",
    place: "C棟活動教室B",
    price: "免費",
    remark: "現場有專人協助照顧",
  },
]);
</script>

<style scoped>
.poster {
  width: 100%;
  height: 400px;
  background-image: url(@/assets/facility/poster.jpg);
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
.facility {
  width: 75%;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 20px;
  display: flex;
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
  width: 100%;
}
hr {
  border: 1px dashed black;
}
.right {
  padding: 15px;
  box-sizing: border-box;
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
  margin-right: 20px;
  width: 100px;
  color: white;
  text-align: center;
}
@media screen and (max-width: 1024px) {
  .title,
  .facility {
    width: 90%;
  }
  .facility {
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
  .facility {
    flex-direction: column;
    height: 100%;
  }
  .theme {
    font-size: 20px;
  }
  .left,
  .right {
    width: 100%;
  }
  .info {
    font-size: 18px;
    margin: 0 10px;
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
  .info {
    margin: 0 5px;
  }
  .detail {
    margin: 10px 5px;
  }
  .block {
    width: 70px;
  }
}
</style>