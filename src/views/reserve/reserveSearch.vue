<template>
  <div class="title">搜尋結果</div>
  <div class="container">
    <div class="room" v-for="(item, index) in filteredItems" :key="index">
      <div class="top"><img :src="item.pic" /></div>
      <div class="bottom">
        <div class="name">{{ item.name }}</div>
        <div class="info-container">
          <div class="info">
            <div class="block">入住日期:</div>
            <span>{{ date1 }}</span>
          </div>
          <div class="info">
            <div class="block">退房日期:</div>
            <span>{{ date2 }}</span>
          </div>
          <div class="info">
            <div class="block">入住天數:</div>
            <span>{{ dayDifference }}天</span>
          </div>
          <div class="info">
            <div class="block">平日:</div>
            <span>NT${{ addComma(item.price) }}</span>
          </div>
          <div class="info">
            <div class="block">假日:</div>
            <span>NT${{ addComma(parseInt(item.price) + 1000) }}</span>
          </div>
          <div class="info">
            <div class="block">剩餘間數:</div>
            <span
              :style="{
                color: availableCounts[item.name] < 2 ? 'red' : 'black',
              }"
            >
              {{ availableCounts[item.name] }}
            </span>
          </div>
          <div class="info">
            <div class="block">訂購間數:</div>
            <span>
              <el-select v-model="item.number">
                <el-option v-for="n in 5" :key="n" :label="n" :value="n" />
              </el-select>
            </span>
          </div>
          <div class="total">
            總計:NT${{ addComma(calculateTotalPrice(item.name) * item.number )}}
          </div>
        </div>
        <div class="reserve" @click="toConfirm(item)">立即訂房</div>
      </div>
    </div>
  </div>
  <div class="back" @click="toReserve">上一步</div>
</template>

<script setup>
import ClassicPic from "@/assets/reserve/classic.jpg";
import Classic2Pic from "@/assets/reserve/classic-2.jpg";
import LuxuaryPic from "@/assets/reserve/luxuary.jpg";
import Luxuary2Pic from "@/assets/reserve/luxuary-2.jpg";
import MountainPic from "@/assets/reserve/mountain.jpg";
import Mountain2Pic from "@/assets/reserve/mountain-2.jpg";
import OceanPic from "@/assets/reserve/ocean.jpg";
import Ocean2Pic from "@/assets/reserve/ocean-2.jpg";
import { reactive, watch, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "@/services/firebase.js";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ElMessageBox, ElLoading } from "element-plus";
import dayjs from 'dayjs';

// 路由資料
const route = useRoute();
const date1 = ref(route.query.date1);
const date2 = ref(route.query.date2);
const room = ref(route.query.room);

// 監聽路由資料
watch(
  [() => route.query.date1, () => route.query.date2, () => route.query.room],
  ([newDate1, newDate2, newRoom]) => {
    date1.value = newDate1;
    date2.value = newDate2;
    room.value = newRoom;
    updateFilteredItems();
    getCount();
  }
);

//金額加上逗號
const addComma=(price)=>{
return new Intl.NumberFormat('en-US').format(price)
}

//IOS簡化日期(不能YYYY-MM-DD)
const formatDateForIOS = (dateString) => {
  return dayjs(dateString).format('YYYY/MM/DD');
};

// 房型資料
const items = reactive([
  {
    pic: ClassicPic,
    name: "經典雙人套房",
    price: "4000",
    route: "/room/room-classic",
    id: "classic",
    number: ref(1),
  },
  {
    pic: Classic2Pic,
    name: "經典四人套房",
    price: "5600",
    route: "/room/room-classic",
    id: "classic2",
    number: ref(1),
  },
  {
    pic: LuxuaryPic,
    name: "豪華雙人套房",
    price: "6600",
    route: "/room/room-luxuary",
    id: "luxuary",
    number: ref(1),
  },
  {
    pic: Luxuary2Pic,
    name: "豪華四人套房",
    price: "12000",
    route: "/room/room-luxuary",
    id: "luxuary2",
    number: ref(1),
  },
  {
    pic: MountainPic,
    name: "山景雙人套房",
    price: "4600",
    route: "/room/room-mountain",
    id: "mountain",
    number: ref(1),
  },
  {
    pic: Mountain2Pic,
    name: "山景四人套房",
    price: "6200",
    route: "/room/room-mountain",
    id: "mountain2",
    number: ref(1),
  },
  {
    pic: OceanPic,
    name: "海景雙人套房",
    price: "5000",
    route: "/room/room-ocean",
    id: "ocean",
    number: ref(1),
  },
  {
    pic: Ocean2Pic,
    name: "海景四人套房",
    price: "6600",
    route: "/room/room-ocean",
    id: "ocean2",
    number: ref(1),
  },
]);

// 根據路由房型決定要遍歷的資料
const filteredItems = ref([]);
const updateFilteredItems = () => {
  if (room.value === "全部") {
    filteredItems.value = items;
  } else {
    filteredItems.value = items.filter((item) => item.name === room.value);
  }
};

watch(() => room.value, updateFilteredItems);
onMounted(() => {
  updateFilteredItems();
});

//獲取房間數
const counts = ref({});
const availableCounts = ref(0);

const getCount = async () => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: "Loading...",
    background: "rgba(0, 0, 0, 0.5)",
  });

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

  if (room.value === "全部") {
    //選擇全部時，獲取所有房型房間數
    for (const roomType in roomTypeData) {
      const databaseID = roomTypeData[roomType];
      const countsData = doc(db, "counts", databaseID);
      const countsDoc = await getDoc(countsData);
      if (countsDoc.exists()) {
        counts.value[roomType] = countsDoc.data();
      }
    }
  } else {
    // 選擇特定房型，獲取該房型房間數
    const databaseID = roomTypeData[room.value];
    const countsData = doc(db, "counts", databaseID);
    const countsDoc = await getDoc(countsData);
    if (countsDoc.exists()) {
      counts.value[room.value] = countsDoc.data();
    }
  }
  calculateAvailableCounts();
  loadingInstance.close();
};

onMounted(() => {
  getCount();
});

//計算剩餘房間數
const calculateAvailableCounts = () => {
  const startDate = dayjs(formatDateForIOS(date1.value));
  const allRoomTypes = Object.keys(counts.value);
  const initialCounts = {};

  //定義為無限大，方便後續篩選取最小值
  allRoomTypes.forEach((roomType) => {
    initialCounts[roomType] = Infinity;
  });

  for (let i = 0; i <= dayDifference.value; i++) {
    const currentDate = startDate.add(i, 'day');
    const dateString = currentDate.format('YYYY-MM-DD');

    allRoomTypes.forEach((roomType) => {
      const roomCounts = counts.value[roomType];
      if (roomCounts && roomCounts[dateString] !== undefined) {
        initialCounts[roomType] = Math.min(
          initialCounts[roomType],
          roomCounts[dateString]
        );
      } else {
        initialCounts[roomType] = 0;
      }
    });
  }

  availableCounts.value = initialCounts;
};

watch([date1, date2, counts], calculateAvailableCounts);

// 計算 date1 到 date2 之間的總房價
const calculateTotalPrice = (roomName) => {
  let totalPrice = 0;
  const startDate = dayjs(date1.value);
  const endDate = dayjs(date2.value);

  for (let currentDay = startDate; currentDay.isBefore(endDate); currentDay = currentDay.add(1, 'day')) {
    const dayOfWeek = currentDay.day();
    let price = 0;

    filteredItems.value.forEach((item) => {
      if (item.name === roomName) {
        price += parseInt(item.price);
    
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          price += 1000;
        }
      }
    });
    totalPrice += price;
  }
  return totalPrice;
};

// 計算 date1 到 date2 之間的天數
const dayDifference = ref("");
const calculateDayDifference = () => {
  const startDate = dayjs(date1.value);
  const endDate = dayjs(date2.value);
  const difference = endDate.diff(startDate, 'day');
  dayDifference.value = difference;
};
watch([date1, date2], calculateDayDifference);
calculateDayDifference();

//確認訂單
const auth = getAuth();

function toConfirm(item) {
  const user = auth.currentUser;
  if (!user) {
    ElMessageBox.alert("請先登入會員", "提示", {
      confirmButtonText: "OK",
      callback: () => {
        router.push({
          path: "/member",
          query: { redirect: router.currentRoute.value.fullPath }
        });
      },
    });
  } else {
    if (item.number > availableCounts.value[item.name]) {
      ElMessageBox.alert("剩餘房間不足", "提示", {
        confirmButtonText: "OK",
      });
    } else {
      router.push({
        path: "/reserve/confirm",
        query: {
          date1: date1.value,
          date2: date2.value,
          day: dayDifference.value,
          number: item.number,
          reservePrice: calculateTotalPrice(item.name),
          room: item.name,
        },
      });
    }
  }
}

// 路由方法
const router = useRouter();
function toReserve() {
  router.push({
    path: "/reserve",
  });
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
  width: 45%;
  height: 100%;
  margin: 15px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.3);
}
.top,.bottom {
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
  margin-bottom: 15px;
}
.info {
  display: flex;
  font-size: 20px;
  margin-bottom: 5px;
}
.block {
  width: 100px;
  margin-right: 20px;
  text-align: center;
}
.number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.el-select {
  width: 60px;
}
.total {
  font-size: 25px;
  margin: 10px;
  text-align: center;
}
.reserve {
  margin-top: 10px;
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
.back {
  margin: 20px auto;
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
  .info{
    font-size: 18px;
  }
}
@media screen and (max-width:767px){
  .title{
    font-size: 20px;
    margin: 30px auto 20px ;
    padding: 10px 0;
  }
  .room{
    width: 100%;
    margin: 15px 0;
  }
  .bottom{
    padding: 10px;
  }
  .name,.total{
    font-size: 20px;
  }
  .name{
    margin-bottom: 10px;
  }
  .reserve{
    font-size: 18px;
  }
  .info{
    margin: 10px;
  }
  .back{
    font-size: 18px;
    width: 150px;
    height: 40px;
  }
}
@media screen and (max-width:414px){
  .title,.container{
    width: 90%;
  }
  .room{
    margin: 10px 0;
  }
  .name{
    font-size: 18px;
    margin-bottom: 5px;
  }
  .info,.reserve{
    font-size: 16px;
  }
  .total{
    margin: 5px;
  }
}
</style>
