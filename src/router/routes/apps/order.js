export default [
  {
    path: "/main/:branchID?",
    name: "main",
    component: () => import("@/views/apps/order/MainOrder.vue"),
  },
  {
    path: "/order/:branchID?/:orderID?/:table?",
    name: "order",
    component: () => import("@/views/apps/order/Order.vue"),
  },
  {
    path: "/order/payment/:id",
    name: "order-payment",
    component: () => import("@/views/apps/order/OrderPayment.vue"),
  },
  {
    path: "/order/confirm",
    name: "order-confirm",
    component: () => import("@/views/apps/order/OrderConfirm.vue"),
  },
];
