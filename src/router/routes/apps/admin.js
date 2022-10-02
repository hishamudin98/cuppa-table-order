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
    {
      path: "/admin/staff",
      name: "admin-staff",
      component: () => import("@/views/apps/administrator/adminStaff.vue"),
    },
    {
      path: "/admin/menu",
      name: "admin-menu",
      component: () => import("@/views/apps/administrator/adminMenu.vue"),
    },
    {
      path: "/admin/report",
      name: "admin-report",
      component: () => import("@/views/apps/administrator/adminReports.vue"),
    },
    /*{
      path: "/order/previous/:orderID?",
      name: "order-previous",
      component: () => import("@/views/apps/order/OrderPrevious.vue"),
    }, */
  ];
  