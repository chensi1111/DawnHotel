<template>
  <div class="title">訂單資訊</div>
  <div class="container">
    <div class="info">
      <div class="block">房型</div>
      <div class="content">{{ room }}</div>
    </div>
    <div class="info">
      <div class="block">入住日期</div>
      <div class="content">{{ date1 }}</div>
    </div>
    <div class="info">
      <div class="block">退房日期</div>
      <div class="content">{{ date2 }}</div>
    </div>
    <div class="info">
      <div class="block">入住天數</div>
      <div class="content">{{ day }}天</div>
    </div>
    <div class="info">
      <div class="block">預訂間數</div>
      <div class="content">{{ number }}間</div>
    </div>
    <div class="info">
      <div class="block">合計</div>
      <div class="content">NT${{ total }}</div>
    </div>
    <div class="confirm" @click="updateCounts">確認訂單</div>
    <div class="confirm" @click="back">返回</div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { db } from "@/services/firebase";
import { getDoc, doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from 'dayjs';

//路由資料
const route = useRoute();
const date1 = route.query.date1;
const date2 = route.query.date2;
const day = route.query.day;
const number = route.query.number;
const reservePrice = route.query.reservePrice;
const room = route.query.room;
const total = computed(() => {
  //添加逗號
  return new Intl.NumberFormat('en-US').format(reservePrice * day * number);
});

//簡化日期(IOS無法使用YYYY-MM-DD)
const formatDateForIOS = (dateString) => {
  return dayjs(dateString).format('YYYY/MM/DD');
};

//房型資料庫
const roomTypeData = {
  經典雙人套房: "classicDoubleRoomCounts",
  經典四人套房: "classicQuadrupleRoomCounts",
  豪華雙人套房: "luxuryDoubleRoomCounts",
  豪華四人套房: "luxuryQuadrupleRoomCounts",
  山景雙人套房: "mountainDoubleRoomCounts",
  山景四人套房: "mountainQuadrupleRoomCounts",
  海景雙人套房: "oceanDoubleRoomCounts",
  海景四人套房: "oceanQuadrupleRoomCounts",
};

//獲取天數
const getDateRange = (startDate, endDate) => {
  const dates = [];
  const start = dayjs(formatDateForIOS(startDate));
  const end = dayjs(formatDateForIOS(endDate));
  let currentDate = start;

  while (currentDate.isBefore(end, 'day')) {
    dates.push(currentDate.toDate());
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};

//更新房間數
const auth = getAuth();
const updateCounts = async () => {
  const user = auth.currentUser;
  if (!user) {
    ElMessageBox.alert('請先登入會員', '提示', {
      confirmButtonText: 'OK',
      callback: () => {
        router.push({
          path: '/member',
        });
      },
    });
  } else {
    const databaseID = roomTypeData[room];
    const countsRef = doc(db, 'counts', databaseID);
    const countsDoc = await getDoc(countsRef);

    if (countsDoc.exists()) {
      const countsData = countsDoc.data();
      const dateRange = getDateRange(date1, date2);

      //減少訂購的房間數
      dateRange.forEach((date) => {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        if (countsData[dateString] !== undefined) {
          countsData[dateString] -= number;
        }
      });
      await updateDoc(countsRef, countsData);

      //添加訂購資料
      const ordersCollectionRef = collection(db, 'users', user.uid, 'userOrders');
      const currentDate = dayjs();
      const currentDateString = currentDate.format('YYYY-MM-DD HH:mm:ss');

      const orderData = {
        room: room,
        date1: date1,
        date2: date2,
        day: day,
        number: number,
        total: total.value,
        orderDate: currentDateString,
      };

      await addDoc(ordersCollectionRef, orderData);

      router.push({ path: '/home' });
      ElMessage({
        message: '訂單已成功送出',
        type: 'success',
        customClass: 'custom-el-message',
      });
    } else {
      console.error('錯誤：計數文檔不存在');
    }
  }
};

//路由
const router = useRouter();
function back() {
  router.go(-1);
}
</script>

<style scoped>
.title {
  margin: 20px auto 0;
  width: 50%;
  display: flex;
  justify-content: center;
  padding: 15px 0;
  box-sizing: border-box;
  font-size: 25px;
  font-weight: bold;
  border: 2px solid rgb(114, 139, 102);
}
.container {
  width: 50%;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
}
.info {
  font-size: 18px;
  display: flex;
  align-items: center;
  width: 80%;
  height: 40px;
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.3);
}
.block {
  font-size: 20px;
  background-color: rgb(255, 136, 0);
  padding: 5px;
  box-sizing: border-box;
  height: 40px;
  margin-right: 20px;
  width: 150px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm {
  font-size: 18px;
  width: 40%;
  height: 35px;
  border: 1px solid black;
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgba(255, 255, 255, 0.5);
}

.confirm:hover {
  cursor: pointer;
  color: white;
  background-color: transparent;
}
.confirm::after {
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

.confirm:hover::after {
  transform: scaleX(1);
}
@media screen and (max-width: 1024px) {
  .title,
  .container {
    width: 80%;
  }
}
@media screen and (max-width: 767px) {
  .title {
    font-size: 20px;
    padding: 10px 0;
  }
  .container {
    padding: 10px;
  }
  .info {
    width: 90%;
  }
  .block {
    width: 100px;
  }
}
@media screen and (max-width: 414px) {
  .title,
  .container {
    width: 95%;
  }
  .info {
    font-size: 16px;
    height: 30px;
    margin: 5px;
  }
  .block {
    font-size: 18px;
    height: 30px;
    margin-right: 10px;
  }
  .confirm {
    font-size: 16px;
    height: 30px;
  }
}
</style>
<style >
@media screen and (max-width: 414px) {
  .custom-el-message {
    width: 180px;
  }
}
</style>
