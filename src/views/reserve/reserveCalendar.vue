<template>
  <div class="container">
    <div class="room">
      <div class="block">房型</div>
      <el-select v-model="room" placeholder="選擇房型">
        <el-option
          v-for="(item, index) in roomType"
          :key="index"
          :label="item.value"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="day">
      <div class="block">入住天數</div>
      <el-select v-model="day" placeholder="選擇天數">
        <el-option
          v-for="(item, index) in 7"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div class="day">
      <div class="block">訂購間數</div>
      <el-select v-model="number">
        <el-option
          v-for="(item, index) in 5"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div class="info">選擇您的入住日期(開放訂購半年內的房間)</div>
    <el-calendar v-model="date" ref="calendar">
      <template #header="{ date }">
        <el-button size="large" @click="changeMonth('prev-month')"
          >上個月</el-button
        >
        <span>{{ date }}</span>
        <el-button size="large" @click="changeMonth('next-month')"
          >下個月</el-button
        >
      </template>
      <template #date-cell="{ data }">
        <div
          class="date"
          :class="data.isSelected ? 'is-selected' : ''"
          @click="showReservePrice(data.day)"
        >
          {{ data.day.split("-").slice(2).join("-") }}
        </div>
        <div class="price" v-if="getPrice(data.day)">
          ${{ getPrice(data.day) }}
        </div>
        <div
          class="count"
          v-if="getCount(data.day)"
          :style="{ color: getCount(data.day) < 2 ? 'red' : 'black' }"
        >
          <div class="rwd">餘</div>
          {{ getCount(data.day) }}間
        </div>
      </template>
    </el-calendar>
    <div class="button">
      <div class="back" @click="toReserve">上一步</div>
      <div class="back" @click="toConfirm">下一步</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watchEffect,watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "@/services/firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ElMessageBox } from "element-plus";
import dayjs from 'dayjs';

// 切換月份
const calendar = ref();
const changeMonth = (val) => {
  if (!calendar.value) return;
  calendar.value.selectDate(val);
};

//天數
const day = ref("");

//路由資料
const route = useRoute();
const room = ref(route.query.name);
const price = ref(parseInt(route.query.price));

// 房型資料
const roomType = reactive([
  { value: "經典雙人套房" },
  { value: "經典四人套房" },
  { value: "豪華雙人套房" },
  { value: "豪華四人套房" },
  { value: "山景雙人套房" },
  { value: "山景四人套房" },
  { value: "海景雙人套房" },
  { value: "海景四人套房" },
]);

//獲取房型價格
const calculatePrice = (roomType) => {
  switch (roomType) {
    case "經典雙人套房":
      return 4000;
    case "經典四人套房":
      return 5600;
    case "豪華雙人套房":
      return 6600;
    case "豪華四人套房":
      return 12000;
    case "山景雙人套房":
      return 4600;
    case "山景四人套房":
      return 6200;
    case "海景雙人套房":
      return 5000;
    case "海景四人套房":
      return 6600;
  }
};

//切換房型時，重新獲取房型價格及讀取房間數
watch(room, (newRoom, oldRoom) => {
  if (newRoom !== oldRoom) {
    price.value = calculatePrice(newRoom);
    loadFirebaseCounts();
  }
});

// 簡化日期
const formatDate = (date) => {
  return dayjs(date).format('YYYY/MM/DD');
};
//簡化日期(IOS無法使用YYYY-MM-DD)
const formatDateForFirestore = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

//選擇的日期
const date = ref(dayjs());
const newDate = ref(formatDate(date.value));
const newDate2 = ref("");
const confirmDate = ref(formatDateForFirestore(date.value));
const confirmDate2=ref("");

watch(date, (newValue) => {
  newDate.value = formatDate(newValue);
  confirmDate.value = formatDateForFirestore(newValue);
  showReservePrice(newValue);
});

watchEffect(() => {
  const date = dayjs(newDate.value).add(day.value, 'day');
  newDate2.value = formatDate(date);
  confirmDate2.value = formatDateForFirestore(date);
});

// 初始化或從Firebase中讀取房間數據
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

const loadFirebaseCounts = async () => {
  const roomType = roomTypeData[room.value];
  const countsRef = doc(db, "counts", roomType);
  const countsDoc = await getDoc(countsRef);
  const currentDate = new Date();
  const todayString = formatDateForFirestore(currentDate);

  //建立180天的房間數據
  if (!countsDoc.exists()) {
    const countsObj = {};
    for (let i = 0; i < 180; i++) {
      const date = dayjs(currentDate).add(i, 'day').toDate();
      countsObj[formatDateForFirestore(date)] = 5;
    }
    await setDoc(countsRef, countsObj);

  } else {
    const countsData = countsDoc.data();
    const newCounts = {};
    const fieldsToDelete = {};

    // 標記需要删除今天以前的日期
    for (const date in countsData) {
      if (date >= todayString) {
        newCounts[date] = countsData[date];
      } else {
        fieldsToDelete[date] = deleteField();
      }
    }

    // 保持數據為180天
    const currentDataLength = Object.keys(newCounts).length;
    for (let i = 0; i < 180 - currentDataLength; i++) {
      const date = dayjs(currentDate).add(currentDataLength + i, 'day').toDate();
      newCounts[formatDateForFirestore(date)] = 5;
    }
    counts.value = newCounts;
    await updateDoc(countsRef, fieldsToDelete);
  }
};

onMounted(() => {
  loadFirebaseCounts();
  showReservePrice();
});

// 獲取預訂日價格
const reservePrice = ref("");
const showReservePrice = (value) => {
  const targetDate = dayjs(value);
  const dayOfWeek = targetDate.day();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    reservePrice.value = price.value + 1000;
  } else {
    reservePrice.value = price.value;
  }
};

// 顯示價錢，周末價格貴1000
const getPrice = (day) => {
  const currentDate = dayjs();
  const targetDate = dayjs(day);
  if (targetDate < currentDate.startOf('day')) {
    return "";
  }
  const dayOfWeek = targetDate.day();
  const priceValue = (dayOfWeek === 0 || dayOfWeek === 6) ? price.value + 1000 : price.value;
  // 添加逗號
  return new Intl.NumberFormat('en-US').format(priceValue);
};

// 顯示剩餘間數
const counts = ref({});
const getCount = (day) => {
  const dateString = dayjs(day).format('YYYY-MM-DD');
  const count = counts.value[dateString];
  return count !== undefined ? `${count}` : "";
};

//確認訂單
const number = ref(1);
const auth = getAuth();
function toConfirm() {
  const user = auth.currentUser;
  if (!user) {
    ElMessageBox.alert("請先登入會員", "提示", {
      confirmButtonText: "OK",
      callback: () => {
        router.push({
          path: "/member",
        });
      },
    });
  } else {
    if (!day.value) {
      ElMessageBox.alert("請選擇入住天數", "提示", {
        confirmButtonText: "ok",
      });
    } else {
      const today = dayjs().format('YYYY-MM-DD');
      const maxDate = dayjs().add(180, 'day').format('YYYY-MM-DD');
      const selectedDate = dayjs(newDate.value).format('YYYY-MM-DD');
      if (selectedDate < today) {
        ElMessageBox.alert("無法選擇今天以前的日期", "提示", {
          confirmButtonText: "ok",
        });
      } else if (selectedDate >= maxDate) {
        ElMessageBox.alert("只能選擇半年內的日期", "提示", {
          confirmButtonText: "ok",
        });
      } else {
        const start = dayjs(newDate.value);
        const end = dayjs(newDate2.value);
        let canConfirm = true;
        for (let date = start; date < end; date = date.add(1, 'day')) {
          const dateString = date.format('YYYY-MM-DD');
          if (counts.value[dateString] < number.value) {
            canConfirm = false;
            break;
          }
        }
        if (canConfirm) {
          router.push({
            path: "/reserve/confirm",
            query: {
              date1: confirmDate.value,
              date2: confirmDate2.value,
              day: day.value,
              number: number.value,
              reservePrice: reservePrice.value,
              room: room.value,
            },
          });
        } else {
          ElMessageBox.alert("剩餘房間不足", "提示", {
            confirmButtonText: "ok",
          });
        }
      }
    }
  }
}

// 路由
const router = useRouter();
function toReserve() {
  router.push({
    path: "/reserve",
  });
}
</script>

<style scoped>
.container {
  margin: auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.room,
.day,
.info {
  width: 100%;
  height: 40px;
  margin: 10px;
  display: flex;
}
.info {
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(255, 136, 0);
  font-size: 18px;
  box-sizing: border-box;
}
.block {
  background-color: rgb(255, 136, 0);
  font-size: 20px;
  padding: 5px;
  box-sizing: border-box;
  height: 100%;
  width: 20%;
  color: white;
  text-align: center;
}
::v-deep .el-select__wrapper {
  min-height: 40px;
}
span {
  font-size: 25px;
}
.el-button {
  font-size: 20px;
  width: 200px;
}
.is-selected {
  color: #1989fa;
}
::v-deep .el-calendar-table .el-calendar-day {
  height: 100px;
}
.date,
.price,
.count {
  display: flex;
  justify-content: center;
  align-items: center;
}
.date {
  font-size: 20px;
}
.price {
  margin: 5px 0;
}
.button {
  display: flex;
}
.back {
  margin: 20px 10px;
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
@media screen and (max-width: 767px) {
  .container {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
  .room,
  .day {
    font-size: 18px;
    height: 35px;
  }

  ::v-deep .el-select__wrapper {
    min-height: 35px;
  }
  .block {
    font-size: 18px;
    width: 30%;
  }
  .info {
    font-size: 14px;
    height: 35px;
  }
  .el-calendar {
    width: 100%;
    font-size: 14px;
  }
  ::v-deep .el-calendar__header {
    padding: 5px;
  }
  span {
    font-size: 20px;
  }
  ::v-deep .el-calendar__body {
    padding: 5px;
  }
  .el-button {
    width: 80px;
  }
  .price {
    font-size: 14px;
  }
  .count {
    font-size: 14px;
  }
  .back {
    font-size: 18px;
    width: 150px;
    height: 40px;
  }
}
@media screen and (max-width: 414px) {
  .block {
    font-size: 16px;
    width: 35%;
  }
  .back {
    font-size: 16px;
    width: 100px;
  }
  .rwd {
    display: none;
  }
}
</style>
