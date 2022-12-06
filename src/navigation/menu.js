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
            icon: "",
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
            icon: "",
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
            icon: "",
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
            icon: "",
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
            icon: "",
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
            icon: "",
            child: [],
            meta: {
                staffCategory: [1, 2, 3]
            }
        }]
    },
    {
        child: [{
            title: "Stock (HQ)",
            child: [{
                    title: "Manage Stock",
                    route: { name: "hq-manage-stock" },
                    meta: {
                        staffCategory: [1, 2, 3]
                    }
                },
                {
                    title: "Manage Order Outlet",
                    route: { name: "manage-order-stock-outlet-hq" },
                    meta: {
                        staffCategory: [1, 2, 3]
                    }
                }
            ],
            meta: {
              staffCategory: [1, 2, 3],
            },
          },
        ],
        meta: {
          staffCategory: [1, 2, 3],
        },
      },
    
  
  {
    child: [
      {
        title: "Purchase Order",
        route: { name: "manage-order-stock-supplier" },
        meta: {
          staffCategory: [1, 2, 3],
        },
      },
    ],
  },
  {
    child: [
      {
        title: "Delivery Order",
        route: { name: "manage-delivery-order" },
        meta: {
          staffCategory: [1, 2, 3],
        },
      },
    ],
  },
  {
    child: [
      {
        title: "Invoice",
        route: { name: "manage-invoice" },
        meta: {
          staffCategory: [1, 2, 3],
        },
      },
    ],
  },
  {
    child: [
      {
        title: "Payment Voucher",
        route: { name: "manage-payment-voucher" },
        meta: {
          staffCategory: [1, 2, 3],
        },
      },
    ],
  },
  {
    child: [
      {
        title: "Store",
        route: { name: "manage-store" },
        meta: {
          staffCategory: [1, 2, 3],
        },
      },
    ],
  },
  {
    child: [
      {
        title: "Supplier",
        route: { name: "admin-supplier" },
        meta: {
          staffCategory: [1, 2, 3],
        },
      },
    ],
  },
  {
    child: [
      {
        title: "Report",
        child: [
          {
            title: "Report Transaction",
            route: { name: "admin-report-t" },
            meta: {
              staffCategory: [1, 2, 3],
            },
          },
          {
            title: "Report Shift",
            route: { name: "admin-report-s" },
            meta: {
              staffCategory: [1, 2, 3],
            },
          },
        ],
        meta: {
          staffCategory: [1, 2, 3],
        },
      },
    ],
  },
  {
    child: [
      {
        title: "Settings",
        route: { name: "login" },
        meta: {
          staffCategory: [1, 2, 3],
        },
      },
    ],
  },
  {
    child: [
      {
        title: "Log Out",
        route: { name: "login" },
        meta: {
          staffCategory: [1, 2, 3],
        },
      },
    ],
  },
];