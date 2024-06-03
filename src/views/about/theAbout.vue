<template>
  <div class="poster">
    <div class="slogan">晨光破曉</div>
    <div class="slogan">帶來新的希望與勇氣</div>
    <div class="sub-slogan">The dawn breaks, bringing new hope and courage</div>
  </div>
  <div class="topic">
    <h1 data-aos="fade-down" data-aos-duration="1000">關於我們</h1>
    <h2 data-aos="fade-down" data-aos-duration="1500">About</h2>
  </div>
  <div class="container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }"
        ><el-icon><House /></el-icon
      ></el-breadcrumb-item>
      <el-breadcrumb-item>關於我們</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">DawnHotel</div>
    <div class="content">
      DawnHotel位於海濱，每天清晨，當太陽剛剛升起，第一縷曙光穿過天際，照亮著大海和沙灘，這一幕壯麗的日出成為了這裡的象徵和靈感。在這個與大自然息息相關的地方，日出不僅是一個美麗的景色，更是一種寓意，象徵著新的開始、希望和活力。
    </div>
    <div class="content">
      以日出為元素，體現了對於新生活的渴望和追求。清晨的第一縷陽光照耀著大地，為每一位來訪的客人帶來了希望和勇氣，啟發他們在這片美麗的海岸線上展開自己的旅程。
    </div>
    <div class="content">
      因此，DawnHotel不僅是一個優雅的住宿場所，更是一個象徵著新生活和美好未來的地方。在這裡，您可以感受到日出的魅力，開啟新的一天，迎接新的挑戰，並創造出屬於自己的精彩故事。
    </div>
    <div class="pic">
      <img
        src="@/assets/about/about1.jpg"
        data-aos="zoom-in"
        data-aos-duration="1500"
      />
      <img
        src="@/assets/about/about2.jpg"
        data-aos="zoom-in"
        data-aos-duration="1500"
      />
      <img
        src="@/assets/about/about3.jpg"
        data-aos="zoom-in"
        data-aos-duration="1500"
      />
    </div>
  </div>
</template>


<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
</script>

<style scoped>
.poster {
  width: 100%;
  height: 400px;
  background-image: url(@/assets/about/poster.jpg);
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
.content {
  width: 80%;
  font-size: 20px;
  margin: 5px;
}
.pic {
  width: 80%;
  display: flex;
  justify-content: center;
  margin: 30px;
}
img {
  width: 30%;
  display: block;
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
  .pic {
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 80%;
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