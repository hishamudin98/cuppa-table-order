export default [{
        path: "/admin/login",
        name: "login",
        component: () =>
            import ("@/views/apps/administrator/adminLogin.vue")
    },
    {
        path: "/admin/:staffid?",
        name: "dashboard",
        component: () =>
            import ("@/views/apps/administrator/adminDashboard.vue")
    },
    {
        path: "/admin/outlet",
        name: "admin-outlet",
        component: () =>
            import ("@/views/apps/administrator/outlet/adminOutlet.vue")
    },
    {
        path: "/admin/staff/:outletid?",
        name: "admin-staff-outlet",
        component: () =>
            import ("@/views/apps/administrator/User/adminStaff.vue")
    },
    {
        path: "/admin/staff",
        name: "admin-staff",
        component: () =>
            import ("@/views/apps/administrator/User/adminOutletStaff.vue")
    },
    {
        path: "/admin/menu",
        name: "admin-menu",
        component: () =>
            import ("@/views/apps/administrator/Menu/adminMenu.vue")
    },
    {
        path: "/admin/menu/:menuid?",
        name: "admin-menu-outlet",
        component: () =>
            import ("@/views/apps/administrator/Menu/adminMenuOutlet.vue"),
        meta: {
            title: "Menu Price Management",
            breadcrumb: [{
                    title: "Menu",
                    route: { name: "admin-menu" }
                },
                {
                    title: "Menu Price Management",
                    route: {
                        name: "admin-menu-outlet"
                    }
                }
            ]
        }
    },
    {
        path: "/admin/menu/raw-material/:menuid?",
        name: "admin-menu-rawmaterial",
        component: () =>

            import ("@/views/apps/administrator/Menu/adminMenuRawMaterial.vue"),
        meta: {
            title: "Menu Raw Material Management",
            breadcrumb: [{
                    title: "Menu",
                    route: { name: "admin-menu" }
                },
                {
                    title: "Menu Raw Material Management",
                    route: {
                        name: "admin-menu-rawmaterial"
                    }
                }
            ]
        }
    },
    {
        path: "/admin/user",
        name: "admin-user",
        component: () =>
            import ("@/views/apps/administrator/Membership/adminUser.vue")
    },
    {
        path: "/admin/report/transaction",
        name: "admin-report-t",
        component: () =>
            import ("@/views/apps/administrator/Reports/adminReports.vue")
    },
    {
        path: "/admin/report/shift",
        name: "admin-report-s",
        component: () =>
            import ("@/views/apps/administrator/Reports/adminReportsShift.vue")
    },
    {
        path: "/admin/report/refund",
        name: "admin-report-r",
        component: () =>
            import ("@/views/apps/administrator/Reports/adminReportsRefund.vue")
    },
    {
        path: "/admin/table",
        name: "admin-table",
        component: () =>
            import ("@/views/apps/administrator/outlet/adminTable.vue")
    },

    {
        path: "/admin/station",
        name: "admin-station",
        component: () =>
            import ("@/views/apps/administrator/outlet/adminStation.vue")
    },

    {
        path: "/admin/order",
        name: "admin-order",
        component: () =>
            import ("@/views/apps/administrator/Order/adminOrder.vue")
    },

    {
        path: "/admin/supplier",
        name: "admin-supplier",
        component: () =>
            import ("@/views/apps/administrator/supplier/manageSupplier.vue")
    },

    {
        path: "/admin/manage-stock",
        name: "hq-manage-stock",
        component: () =>
            import ("@/views/apps/administrator/stock/hq/manageStock.vue"),
        meta: {
            title: "Manage Stock",
            breadcrumb: [{
                    title: "Home",
                    route: { name: "dashboard" }
                },
                {
                    title: "Stock",
                    route: {
                        name: "hq-manage-stock"
                    }
                }
            ]
        }
    },

    {
        path: "/admin/hq-stock-supplier/:id",
        name: "hq-stock-supplier",
        component: () =>
            import ("@/views/apps/administrator/stock/hq/detailsStockSupplier.vue")
    },

    {
        path: "/admin/manage-order-stock",
        name: "manage-order-stock-supplier",
        component: () =>
            import ("@/views/apps/administrator/purchaseOrder/hq/manageOrderSupplier.vue")
    },

    {
        path: "/admin/manage-order-stock/:id",
        name: "order-stock-supplier",
        component: () =>
            import ("@/views/apps/administrator/purchaseOrder/hq/manageStockOrderSupplier.vue")
    },

    {
        path: "/admin/manage-order-stock-outlet-hq",
        name: "manage-order-stock-outlet-hq",
        component: () =>
            import ("@/views/apps/administrator/stock/hq/manageOrderOutlet.vue")
    },

    {
        path: "/admin/summary-stock-order",
        name: "summary-stock-order",
        component: () =>
            import ("@/views/apps/administrator/stock/hq/summaryStockOrder.vue")
    },

    {
        path: "/admin/manage-order-stock-outlet-hq/:id",
        name: "order-stock-outlet-hq",
        component: () =>
            import ("@/views/apps/administrator/stock/hq/manageStockOrderOutlet.vue")
    },

    {
        path: "/admin/outlet/manage-stock",
        name: "outlet-manage-stock",
        component: () =>
            import ("@/views/apps/administrator/stock/outlet/manageStock.vue")
    },

    {
        path: "/admin/manage-order-stock-outlet",
        name: "manage-order-stock-outlet",
        component: () =>
            import ("@/views/apps/administrator/stock/outlet/manageOrder.vue")
    },

    {
        path: "/admin/order-stock-outlet/:id",
        name: "order-stock-outlet",
        component: () =>
            import ("@/views/apps/administrator/stock/outlet/stockOrder.vue")
    },

    {
        path: "/admin/store",
        name: "manage-store",
        component: () =>
            import ("@/views/apps/administrator/store/manageStore.vue"),
        meta: {
            title: "Store",
            breadcrumb: [{
                    title: "Home",
                    route: { name: "dashboard" }
                },
                {
                    title: "Store",
                    route: { name: "manage-store" }
                }
            ]
        }
    },

    {
        path: "/admin/delivery-order",
        name: "manage-delivery-order",
        component: () =>
            import ("@/views/apps/administrator/deliveryOrder/hq/manageDO.vue")
    },

    {
        path: "/admin/invoice",
        name: "manage-invoice",
        component: () =>
            import ("@/views/apps/administrator/invoice/hq/manageInvoice.vue")
    },

    {
        path: "/admin/invoice-outlet",
        name: "manage-invoice-outlet",
        component: () =>
            import ("@/views/apps/administrator/invoice/outlet/manageInvoice.vue")
    },

    {
        path: "/admin/organization",
        name: "admin-organization",
        component: () =>
            import ("@/views/apps/administrator/organization/adminOrganization.vue"),
        /* meta: {
            title: "Manage Stock",
            breadcrumb: [{
                    title: "Home",
                    route: { name: "dashboard" }
                },
                {
                    title: "Stock",
                    route: {
                        name: "hq-manage-stock"
                    }
                }
            ]
        } */
    },

    {
        path: "/admin/delivery-order-outlet",
        name: "manage-delivery-order-outlet",
        component: () =>
            import ("@/views/apps/administrator/deliveryOrder/outlet/manageDO.vue")
    },

    {
        path: "/admin/payment-voucher",
        name: "manage-payment-voucher",
        component: () =>
            import ("@/views/apps/administrator/paymentVoucher/hq/managePayment.vue")
    },

    {
        path: "/admin/payment-voucher-outlet",
        name: "manage-payment-voucher-outlet",
        component: () =>
            import (
                "@/views/apps/administrator/paymentVoucher/outlet/managePayment.vue"
            )
    },

    {
        path: "/admin/order-supplier",
        name: "manage-order-supplier",
        component: () =>
            import (
                "@/views/apps/administrator/purchaseOrder/supplier/manageOrder.vue"
            )
    },

    {
        path: "/admin/delivery-order-supplier",
        name: "manage-delivery-order-supplier",
        component: () =>
            import ("@/views/apps/administrator/deliveryOrder/supplier/manageDO.vue")
    },

    {
        path: "/admin/invoice-supplier",
        name: "manage-invoice-supplier",
        component: () =>
            import ("@/views/apps/administrator/invoice/supplier/manageInvoice.vue")
    }
    /*{
                          path: "/order/previous/:orderID?",
                          name: "order-previous",
                          component: () => import("@/views/apps/order/OrderPrevious.vue"),
                        }, */
];