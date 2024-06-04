import { createRouter, createWebHashHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { nextTick } from 'vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@/views/home/theHome.vue')
    },
    {
      path: '/news',
      component: () => import('@/views/news/theNews.vue'),
      meta: { scrollAnchor: '#topic' },
      children: [
        {
          path: '',
          component: () => import('@/views/news/newsHome.vue')
        },
        {
          path: 'info',
          component: () => import('@/views/news/newsInfo.vue')
        }
      ]
    },
    {
      path: '/about',
      component: () => import('@/views/about/theAbout.vue')
    },
    {
      path: '/room',
      component: () => import('@/views/room/theRoom.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/room/roomList.vue')
        },
        {
          path: 'room-mountain',
          component: () => import('@/views/room/roomMountain.vue')
        },
        {
          path: 'room-ocean',
          component: () => import('@/views/room/roomOcean.vue')
        },
        {
          path: 'room-classic',
          component: () => import('@/views/room/roomClassic.vue')
        },
        {
          path: 'room-luxuary',
          component: () => import('@/views/room/roomLuxuary.vue')
        }
      ]
    },
    {
      path: '/facility',
      component: () => import('@/views/facility/theFacility.vue'),
    },
    {
      path: '/food',
      component: () => import('@/views/food/theFood.vue'),
    },
    {
      path: '/trafic',
      component: () => import('@/views/trafic/theTrafic.vue')
    },
    {
      path: '/reserve',
      component: () => import('@/views/reserve/theReserve.vue'),
      meta: { scrollAnchor: '#nav' },
      children: [
        {
          path: '',
          component: () => import('@/views/reserve/reserveList.vue')
        },
        {
          path: 'calendar',
          component: () => import('@/views/reserve/reserveCalendar.vue'),

        },
        {
          path: 'confirm',
          component: () => import('@/views/reserve/reserveConfirm.vue'),

        },
        {
          path: 'search',
          component: () => import('@/views/reserve/reserveSearch.vue'),

        }
      ]
    },
    {
      path: '/member',
      component: () => import('@/views/member/theMember.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/member/memberSignIn.vue')
        },
        {
          path: 'signup',
          component: () => import('@/views/member/memberSignUp.vue')
        }
      ]
    },
    {
      path: '/info',
      component: () => import('@/views/info/theInfo.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'list',
          component: () => import('@/views/info/infoList.vue'),
        },
        {
          path: 'setting',
          component: () => import('@/views/info/infoSetting.vue'),
          meta: { notScroll: true }
        }
      ]
    }
  ]
});

router.afterEach(async (to) => {
  //滾到到頂端
  if (!to.meta.notScroll) {
    window.scrollTo(0, 0);
  }
  //滾動到錨點
  if (to.meta.scrollAnchor) {
    //更新完DOM再滾動
    await nextTick();
    const anchor = document.querySelector(to.meta.scrollAnchor);
    anchor.scrollIntoView({ behavior: 'smooth' });
  }
});

//檢查是否登入
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

//未登入則返回登入頁
router.beforeEach(async (to) => {
  if (to.meta.requiresAuth && !(await getCurrentUser())) {
    return {
      path: '/member',
    };
  }
});

export default router;
