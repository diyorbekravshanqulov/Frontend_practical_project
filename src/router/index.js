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
    ],
  },
//   {
//     path: "/",
//     component: () => import("../layouts/auth.vue"),
//     children: [
//       {
//         path: "/login",
//         name: "login",
//         component: () => import("../pages/auth/Login.vue"),
//       },
//       {
//         path: "/regis",
//         name: "regis",
//         component: () => import("../pages/auth/Regis.vue"),
//       },
//     ],
//   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
});

export default router;
