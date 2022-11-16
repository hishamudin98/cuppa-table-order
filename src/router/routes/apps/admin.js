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
      component: () => import("@/views/apps/administrator/Membership/adminUser.vue"),
    },
    {
      path: "/admin/staff/:outletid?",
      name: "admin-staff",
      component: () => import("@/views/apps/administrator/User/adminStaff.vue"),
    },
    {
      path: "/admin/menu",
      name: "admin-menu",
      component: () => import("@/views/apps/administrator/Menu/adminMenu.vue"),
    },
    {
      path: "/admin/report/transaction",
      name: "admin-report-t",
      component: () => import("@/views/apps/administrator/Reports/adminReports.vue"),
    },
    {
      path: "/admin/report/shift",
      name: "admin-report-s",
      component: () => import("@/views/apps/administrator/Reports/adminReportsShift.vue"),
    },
    {
      path: "/admin/report/refund",
      name: "admin-report-r",
      component: () => import("@/views/apps/administrator/Reports/adminReportsRefund.vue"),
    },
    {
      path: "/admin/table",
      name: "admin-table",
      component: () => import("@/views/apps/administrator/Outlet/adminTable.vue"),
    },
    {
      path: "/admin/order",
      name: "admin-order",
      component: () => import("@/views/apps/administrator/Order/adminOrder.vue"),
    },
    {
      path: "/admin/outlet",
      name: "admin-outlet",
      component: () => import("@/views/apps/administrator/Outlet/adminOutlet.vue"),
    },
    {
      path: "/admin/staff/outlet",
      name: "admin-outlet-staff",
      component: () => import("@/views/apps/administrator/User/adminOutletStaff.vue"),
    },
    {
      path: "/admin/menu/:menuid?",
      name: "admin-menu-outlet",
      component: () => import("@/views/apps/administrator/Menu/adminMenuOutlet.vue"),
    },
    /*{
      path: "/order/previous/:orderID?",
      name: "order-previous",
      component: () => import("@/views/apps/order/OrderPrevious.vue"),
    }, */
  ];
  