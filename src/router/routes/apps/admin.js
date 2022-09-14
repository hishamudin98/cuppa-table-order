export default [
    {
      path: "/admin/login",
      name: "login",
      component: () => import("@/views/apps/administrator/adminLogin.vue"),
    },
     {
      path: "/admin/:staffid?",
      name: "dashboard",
      component: () => import("@/views/apps/administrator/adminDashboard.vue"),
    },
    {
      path: "/admin/user",
      name: "admin-user",
      component: () => import("@/views/apps/administrator/adminUser.vue"),
    },
    /*{
      path: "/order/confirm",
      name: "order-confirm",
      component: () => import("@/views/apps/order/OrderConfirm.vue"),
    },
    {
      path: "/order/table/:orderID?/:table?",
      name: "order-table",
      component: () => import("@/views/apps/order/OrderTablePOS.vue"),
    },
    {
      path: "/order/previous/:orderID?",
      name: "order-previous",
      component: () => import("@/views/apps/order/OrderPrevious.vue"),
    }, */
  ];
  