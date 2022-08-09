export default [
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/apps/order/Order.vue"),
    meta: {
      title: "Order",
      breadcrumb: [
        {
          title: "Home",
          route: { name: "dashboard" },
        },
        {
          title: "Order",
          route: { name: "order" },
        },
      ],
    },
  },
];
