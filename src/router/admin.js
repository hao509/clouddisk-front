let groupRouter = [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/BasePage.vue"),
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/Home.vue"),
          meta: {
            mingcheng: "首页",
            key: "home",
            level: 1
          }
        },
        {
          path: "/*",
          name: "/*",
          redirect: "/404"
        }
      ]
    }
  ];
  export default groupRouter;