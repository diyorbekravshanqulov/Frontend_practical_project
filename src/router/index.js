import { createRouter, createWebHistory } from "vue-router";

const scrollBehavior = () => {
  return {
    top: 0,
    behavior: "smooth",
  };
};

const routes = [
  {
    path: "/",
    component: () => import("../layouts/default.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../pages/Home.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../pages/About.vue"),
      },
      {
        path: "/taxi-order",
        name: "taxi-order",
        component: () => import("../pages/Taxi_Order.vue"),
      },
      {
        path: "/truck-order",
        name: "truck-order",
        component: () => import("../pages/Truck_Order.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../layouts/auth.vue"),
    children: [
      {
        path: "/user",
        name: "user",
        component: () => import("../pages/auth/User.vue"),
      },
      {
        path: "/",
        name: "passenger",
        component: () => import("../pages/auth/Passenger.vue"),
        children: [
          {
            path: "/passenger/login",
            name: "passenger_login",
            component: () => import("../components/auth/Pas_login.vue"),
          },
          {
            path: "/passenger/regis",
            name: "passenger_regis",
            component: () => import("../components/auth/Pas_regis.vue"),
          },
        ],
      },
      {
        path: "/",
        name: "driver",
        component: () => import("../pages/auth/Driver.vue"),
        children: [
          {
            path: "/driver/login",
            name: "driver_login",
            component: () => import("../components/auth/Driver_login.vue"),
          },
          {
            path: "/driver/regis",
            name: "driver_regis",
            component: () => import("../components/auth/Driver_regis.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
});

export default router;
