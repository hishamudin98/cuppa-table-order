export default [
  {
    path: "/orderLogin/:branchID?/:table?",
    name: "orderLogin",
    component: () => import("@/views/apps/order/orderLogin.vue"),
  },
  {
    path: "/main/:branchID?",
    name: "main",
    component: () => import("@/views/apps/order/MainOrder.vue"),
  },
  {
    path: "/order/:branchID?/:table?/:orderID?",
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
  {
    path: "/order/table/:orderID?/:table?/:branch?",
    name: "order-table",
    component: () => import("@/views/apps/order/OrderTablePOS.vue"),
  },
  {
    path: "/order/previous/:orderID?",
    name: "order-previous",
    component: () => import("@/views/apps/order/OrderPrevious.vue"),
  },
  {
    path: "/orderMembership/:branchID?",
    name: "orderMembership",
    component: () => import("@/views/apps/order/orderMembership.vue"),
  },
  {
    path: "/TakeAway/:branchID?/:table?/:orderID?",
    name: "takeaway",
    component: () => import("@/views/apps/order/OrderTakeAway.vue"),
  },
];
