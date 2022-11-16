export default [{
  path: "/admin/login",
  name: "login",
  component: () =>
    import("@/views/apps/administrator/adminLogin.vue"),
},
{
  path: "/admin/:staffid?",
  name: "dashboard",
  component: () =>
    import("@/views/apps/administrator/adminDashboard.vue"),
},
{
  path: "/admin/outlet",
  name: "admin-outlet",
  component: () =>
    import("@/views/apps/administrator/Outlet/adminOutlet.vue"),
},
{
  path: "/admin/staff/:outletid?",
  name: "admin-staff-outlet",
  component: () => import("@/views/apps/administrator/User/adminStaff.vue"),
},
{
  path: "/admin/staff",
  name: "admin-staff",
  component: () =>
    import("@/views/apps/administrator/User/adminOutletStaff.vue"),
},
{
  path: "/admin/menu",
  name: "admin-menu",
  component: () =>
    import("@/views/apps/administrator/Menu/adminMenu.vue"),
},
{
  path: "/admin/menu/:menuid?",
  name: "admin-menu-outlet",
  component: () =>
    import("@/views/apps/administrator/Menu/adminMenuOutlet.vue"),
},
{
  path: "/admin/menu/raw-material/:menuid?",
  name: "admin-menu-rawmaterial",
  component: () =>
    import("@/views/apps/administrator/Menu/adminMenuRawMaterial.vue"),
},
{
  path: "/admin/user",
  name: "admin-user",
  component: () =>
    import("@/views/apps/administrator/Membership/adminUser.vue"),
},
{
  path: "/admin/report/transaction",
  name: "admin-report-t",
  component: () =>
    import("@/views/apps/administrator/Reports/adminReports.vue"),
},
{
  path: "/admin/report/shift",
  name: "admin-report-s",
  component: () =>
    import("@/views/apps/administrator/Reports/adminReportsShift.vue"),
},
{
  path: "/admin/report/refund",
  name: "admin-report-r",
  component: () =>
    import("@/views/apps/administrator/Reports/adminReportsRefund.vue"),
},
{
  path: "/admin/table",
  name: "admin-table",
  component: () =>
    import("@/views/apps/administrator/Outlet/adminTable.vue"),
},
{
  path: "/admin/order",
  name: "admin-order",
  component: () =>
    import("@/views/apps/administrator/Order/adminOrder.vue"),
},

{
  path: "/admin/supplier",
  name: "admin-supplier",
  component: () =>
    import("@/views/apps/administrator/supplier/supplierIndex.vue"),
},

{
  path: "/admin/manage-stock",
  name: "rawmaterial-index",
  component: () =>
    import("@/views/apps/administrator/rawMaterial/materialIndex.vue"),
},

{
  path: "/admin/manage-order-stock",
  name: "manage-order-stock-supplier",
  component: () =>
    import("@/views/apps/administrator/hq/stock/manageOrderSupplier.vue"),
},

{
  path: "/admin/manage-order-stock/:id",
  name: "order-stock-supplier",
  component: () =>
    import("@/views/apps/administrator/hq/stock/manageStockOrderSupplier.vue"),
},

{
  path: "/admin/manage-order-stock-outlet-hq",
  name: "manage-order-stock-outlet-hq",
  component: () =>
    import("@/views/apps/administrator/hq/stock/manageOrderOutlet.vue"),
},

{
  path: "/admin/manage-order-stock-outlet-hq/:id",
  name: "order-stock-outlet-hq",
  component: () =>
    import("@/views/apps/administrator/hq/stock/manageStockOrderOutlet.vue"),
},

{
  path: "/admin/outlet/manage-stock",
  name: "outlet-manage-stock",
  component: () =>
    import("@/views/apps/administrator/Outlet/stock/manageStock.vue"),
},

{
  path: "/admin/manage-order-stock-outlet",
  name: "manage-order-stock-outlet",
  component: () =>
    import("@/views/apps/administrator/Outlet/stock/manageOrder.vue"),
},

{
  path: "/admin/order-stock-outlet",
  name: "order-stock-outlet",
  component: () =>
    import("@/views/apps/administrator/Outlet/stock/manageOrder.vue"),
},

  /*{
                  path: "/order/previous/:orderID?",
                  name: "order-previous",
                  component: () => import("@/views/apps/order/OrderPrevious.vue"),
                }, */
];