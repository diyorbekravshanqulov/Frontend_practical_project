import { createRouter, createWebHistory } from "vue-router";

const scrollBehavior = () => {
  return {
    top: 0,
    behavior: "smooth",
  };
};

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../pages/not-found.vue"),
  },
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
        path: "/driver-profile",
        name: "driver-profile",
        component: () => import("../pages/profil.vue"),
      },
      {
        path: "/passenger-home",
        name: "passenger-home",
        component: () => import("../pages/Passenger-Home.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../pages/About.vue"),
      },
      {
        path: "/create-car",
        name: "create-car",
        component: () => import("../pages/CreateCar.vue"),
      },
      {
        path: "/FAQ",
        name: "FAQ",
        component: () => import("../pages/FAQ.vue"),
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
          {
            path: "/passenger/verify",
            name: "passenger_verify",
            component: () => import("../pages/Verify.vue"),
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
          {
            path: "/driver/verify",
            name: "driver_verify",
            component: () => import("../pages/driver_verify.vue"),
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (to.name == "home" && Boolean(token)) {
    if (role === "driver") {
      next({ name: "driver-profile" });
    } else {
      next({ name: "passenger-home" });
    }
  } else if (
    to.name !== "home" &&
    to.name !== "passenger_login" &&
    to.name !== "driver_regis" &&
    to.name !== "passenger_regis" &&
    to.name !== "driver_verify" &&
    to.name !== "FAQ" &&
    to.name !== "about" &&
    to.name !== "driver_login" &&
    to.name !== "passenger_verify" &&
    to.name !== "user" &&
    !token
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
