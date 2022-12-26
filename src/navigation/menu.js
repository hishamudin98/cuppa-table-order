export default [{
        child: [{
            title: "Dashboard",
            route: { name: "dashboard" },
            icon: "home",
            child: [],
            meta: {
                staffCategory: "all"
            }
        }]
    },
    {
        child: [{
            title: "Organization",
            route: { name: "admin-organization" },
            icon: "globe",
            child: [],
            meta: {
                staffCategory: [1, 2]
            }
        }]
    },
    {
        child: [{
            title: "Outlet",
            route: { name: "admin-outlet" },
            icon: "map-pin",
            child: [],
            meta: {
                staffCategory: [1, 2, 3]
            }
        }]
    },
    {
        child: [{
            title: "User",
            route: { name: "admin-staff" },
            icon: "users",
            child: [],
            meta: {
                staffCategory: [1, 2, 3, 4]
            }
        }]
    },
    {
        child: [{
            title: "Menu",
            route: { name: "admin-menu" },
            icon: "grid",
            child: [],
            meta: {
                staffCategory: [1, 2, 3]
            }
        }]
    },
    {
        child: [{
            title: "Membership",
            route: { name: "admin-user" },
            icon: "gift",
            child: [],
            meta: {
                staffCategory: [1, 2, 3]
            }
        }]
    },
    {
        child: [{
            title: "Order",
            route: { name: "admin-order" },
            icon: "shopping-bag",
            child: [],
            meta: {
                staffCategory: [1, 2, 3]
            }
        }]
    },
    {
        header: "UI Elements",
        description: "Component for the ui",
        child: [{
            title: "Stock (HQ)",
            child: [{
                    title: "Manage Stock",
                    route: { name: "hq-manage-stock" },
                    icon: "package",
                    meta: {
                        staffCategory: [1, 2]
                    }
                },
                {
                    title: "Manage Order Outlet",
                    route: { name: "manage-order-stock-outlet-hq" },
                    icon: "package",
                    meta: {
                        staffCategory: [1, 2]
                    }
                }
            ],
            icon: "package",
            meta: {
                staffCategory: [1, 2]
            }
        }],
        meta: {
            staffCategory: [1, 2]
        }
    },

    {
        header: "UI Elements",
        description: "Component for the ui",
        child: [{
            title: "Stock (Outlet)",
            route: { name: "outlet-manage-stock" },
            icon: "package",
            meta: {
                staffCategory: [3]
            }
        }],
        meta: {
            staffCategory: [3]
        }
    },

    {
        child: [{
            title: "Purchase Order",
            route: { name: "purchase-order-hq" },
            icon: "shopping-cart",
            meta: {
                staffCategory: [1, 2]
            }
        }]
    },

    {
        child: [{
            title: "Purchase Order",
            route: { name: "purchase-order-outlet" },
            icon: "shopping-cart",
            meta: {
                staffCategory: [3]
            }
        }]
    },

    {
        child: [{
            title: "Purchase Order",
            route: { name: "purchase-order-supplier" },
            icon: "shopping-cart",
            meta: {
                staffCategory: [4]
            }
        }]
    },

    {
        child: [{
            title: "Delivery Order",
            route: { name: "manage-delivery-order" },
            icon: "truck",
            meta: {
                staffCategory: [2]
            }
        }]
    },

    {
        child: [{
            title: "Delivery Order",
            route: { name: "manage-delivery-order-outlet" },
            icon: "truck",
            meta: {
                staffCategory: [3]
            }
        }]
    },

    {
        child: [{
            title: "Invoice",
            route: { name: "manage-invoice" },
            icon: "file-text",
            meta: {
                staffCategory: [2]
            }
        }]
    },

    {
        child: [{
            title: "Invoice",
            route: { name: "manage-invoice-outlet" },
            icon: "file-text",
            meta: {
                staffCategory: [3]
            }
        }]
    },

    {
        child: [{
            title: "Payment Voucher",
            route: { name: "manage-payment-voucher" },
            icon: "credit-card",
            meta: {
                staffCategory: [2]
            }
        }]
    },

    {
        child: [{
            title: "Payment Voucher",
            route: { name: "manage-payment-voucher-outlet" },
            icon: "credit-card",
            meta: {
                staffCategory: [3]
            }
        }]
    },

    {
        child: [{
            title: "Store",
            route: { name: "manage-store" },
            icon: "box",
            meta: {
                staffCategory: [2]
            }
        }]
    },

    {
        child: [{
            title: "Store",
            route: { name: "outlet-manage-store" },
            icon: "box",
            meta: {
                staffCategory: [3]
            }
        }]
    },

    {
        child: [{
            title: "Supplier",
            route: { name: "admin-supplier" },
            icon: "user-plus",
            meta: {
                staffCategory: [2]
            }
        }]
    },
    {
        child: [{
            title: "Supplier",
            route: { name: "outlet-supplier" },
            icon: "user-plus",
            meta: {
                staffCategory: [3]
            }
        }]
    },
    {
        child: [{
            title: "Report",
            child: [{
                    title: "Report Transaction",
                    route: { name: "admin-report-t" },
                    meta: {
                        staffCategory: [1, 2, 3]
                    }
                },
                {
                    title: "Report Shift",
                    route: { name: "admin-report-s" },
                    meta: {
                        staffCategory: [1, 2, 3]
                    }
                }
            ],
            icon: "file-text",
            meta: {
                staffCategory: [1, 2, 3]
            }
        }]
    },
    {
        child: [{
            title: "Settings",
            route: { name: "login" },
            icon: "settings",
            meta: {
                staffCategory: [1, 2, 3]
            }
        }]
    },
    {
        child: [{
            title: "Log Out",
            route: { name: "login" },
            icon: "log-out",
            meta: {
                staffCategory: [1, 2, 3]
            }
        }]
    }
];