<template>
  <div class="w-64">
    <aside aria-label="Sidebar">
      <div class="h-full py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <ul class="space-y-2">
          <!-- DASHBOARD -->
          <li>
            <router-link :to="{ name: 'dashboard' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  focus:bg-gray-300
                  text-white-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-100
                " @click="clickActive()">
                <span class="ml-3">Dashboard</span>
              </a>

            </router-link>
          </li>

          <!-- ORGRANIZATION -->
          <li v-if=" this.staff_category != 4 && this.staff_category != 3">
            <router-link :to="{ name: 'admin-organization' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Organization</span>
              </a>
            </router-link>
          </li>


          <li v-if="this.staff_category != 4">
            <div>
              <router-link :to="{ name: 'admin-outlet' }">
                <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                  <!--  @click="dropdownOutlet()" -->
                  <span class="flex-1 ml-3 whitespace-nowrap">Outlet</span>
                </a>
              </router-link>
            </div>
            <div v-if="this.outletDrop == true">
              <ul>
                <li>
                  <router-link :to="{ name: 'admin-outlet' }">
                    <a href="#" class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "><span class="flex-1 ml-3 whitespace-nowrap">Outlet Management</span>
                    </a>
                  </router-link>
                </li>
                <!-- <li>
                  <router-link :to="{ name: 'admin-table' }">
                    <a href="#" class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "><span class="flex-1 ml-3 whitespace-nowrap">Table Management</span>
                    </a>
                  </router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'admin-table' }">
                    <a href="#" class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "><span class="flex-1 ml-3 whitespace-nowrap">Station Management</span>
                    </a>
                  </router-link>
                </li> -->
              </ul>
            </div>
          </li>
          
          <!-- USER -->
          <li v-if=" this.staff_category != 4">
            <router-link :to="{ name: 'admin-staff' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">User</span>
              </a>
            </router-link>
          </li>
          <!-- MENU -->
          <li v-if=" this.staff_category != 4">
            <router-link :to="{ name: 'admin-menu' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                " @click="dropdownMenu()">
                <span class="flex-1 ml-3 whitespace-nowrap">Menu</span>
              </a>
            </router-link>
            <!-- <div v-if="this.menuDrop == true">
              <ul>
                <li>
                  <router-link :to="{ name: 'admin-menu' }">
                    <a href="#" class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "><span class="flex-1 ml-3 whitespace-nowrap">Menu Management</span>
                    </a>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'admin-menu' }">
                    <a href="#" class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "><span class="flex-1 ml-3 whitespace-nowrap">Category Management</span>
                    </a>
                  </router-link>
                </li>
              </ul>
            </div> -->
          </li>

          <!-- MEMBERSHIP -->
          <li v-if=" this.staff_category != 4">
            <router-link :to="{ name: 'admin-user' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Membership</span>
              </a>
            </router-link>
          </li>

          <!-- ORDER -->
          <li v-if=" this.staff_category != 4">
            <router-link :to="{ name: 'admin-order' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="ml-3">Order</span>
              </a>
            </router-link>
          </li>

          <!-- STOCK HQ -->
          <li v-if="this.staff_category == 2">
            <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                " @click="dropdownStock()">
              <span class="flex-1 ml-3 whitespace-nowrap">Stock (HQ) </span>
            </a>
            <div v-if="this.stockDrop == true">
              <ul>
                <li>
                  <router-link :to="{ name: 'manage-stock' }">
                    <a href="#" class="
                    flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                ">
                      <span class="ml-3">Manage Stock</span>
                    </a>
                  </router-link>
                </li>

                <!-- <li>
                  <router-link :to="{ name: 'manage-order-stock-supplier' }">
                    <a href="#" class="
                    flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700">
                      <span class="ml-3">Manage Order Supplier</span>
                    </a>
                  </router-link>
                </li> -->

                <li>
                  <router-link :to="{ name: 'manage-order-stock-outlet-hq' }">
                    <a href="#" class="
                    flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                ">
                      <span class="ml-3">Manage Order Outlet</span>
                    </a>
                  </router-link>
                </li>

                <!-- <li>
                  <router-link :to="{ name: 'summary-stock-order' }">
                    <a href="#" class="
                    flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                ">
                      <span class="ml-3">Summary Stock Order</span>
                    </a>
                  </router-link>
                </li> -->
              </ul>
            </div>
          </li>

          <!-- STOCK OUTLET -->
          <li v-if="this.staff_category == 3">
            <router-link :to="{ name: 'outlet-manage-stock' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                " @click="dropdownStockOutlet()">
                <span class="flex-1 ml-3 whitespace-nowrap">Stock (Outlet)</span>
              </a>
            </router-link>
            <!-- <div v-if="this.stockDropOutlet == true">
              <ul>
                <li>
                  <router-link :to="{ name: 'outlet-manage-stock' }">
                    <a href="#" class="
                    flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                ">
                      <span class="ml-3">Manage Stock</span>
                    </a>
                  </router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'manage-order-stock-outlet' }">
                    <a href="#" class="
                    flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                ">
                      <span class="ml-3">Manage Order Outlet</span>
                    </a>
                  </router-link>
                </li>
              </ul>
            </div> -->
          </li>

          <!-- HQ -->
          <li v-if="this.staff_category == 2">
            <router-link :to="{ name: 'manage-order-stock-supplier' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Purchase Order </span>
              </a>
            </router-link>
          </li>

          <li v-if="this.staff_category == 2">
            <router-link :to="{ name: 'manage-delivery-order' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Delivery Order  </span>
              </a>
            </router-link>
          </li>

          <li v-if="this.staff_category == 2">
            <router-link :to="{ name: 'manage-invoice' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Invoice </span>
              </a>
            </router-link>
          </li>

          <li v-if="this.staff_category == 2">
            <router-link :to="{ name: 'manage-payment-voucher' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Payment Voucher </span>
              </a>
            </router-link>
          </li>

          <li v-if="this.staff_category == 2">
            <router-link :to="{ name: 'manage-store' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Store </span>
              </a>
            </router-link>
          </li>

          <li v-if="this.staff_category == 2">
            <router-link :to="{ name: 'admin-supplier' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Supplier </span>
              </a>
            </router-link>
          </li>


          <!-- OUTLET -->
          <li v-if="this.staff_category == 3">
            <router-link :to="{ name: 'manage-order-stock-outlet' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Purchase Order</span>
              </a>
            </router-link>
          </li>

          <li v-if="this.staff_category == 3">
            <router-link :to="{ name: 'manage-delivery-order-outlet' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Delivery Order </span>
              </a>
            </router-link>
          </li>

          <li v-if="this.staff_category == 3">
            <router-link :to="{ name: 'manage-invoice-outlet' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Invoice </span>
              </a>
            </router-link>
          </li>

          <li v-if="this.staff_category == 3">
            <router-link :to="{ name: 'manage-payment-voucher-outlet' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Payment Voucher </span>
              </a>
            </router-link>
          </li>

          <!-- Supplier -->
          <li v-if="this.staff_category == 4">
            <router-link :to="{ name: 'manage-order-supplier' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Organization</span>
              </a>
            </router-link>
          </li>

          <li v-if="this.staff_category == 4">
            <router-link :to="{ name: 'manage-order-supplier' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">User</span>
              </a>
            </router-link>
          </li>

          <li v-if="this.staff_category == 4">
            <router-link :to="{ name: 'manage-order-supplier' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Purchase Order</span>
              </a>
            </router-link>
          </li>

          <li v-if="this.staff_category == 4">
            <router-link :to="{ name: 'manage-delivery-order-supplier' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Delivery Order</span>
              </a>
            </router-link>
          </li>

          <li v-if="this.staff_category == 4">
            <router-link :to="{ name: 'manage-invoice-supplier' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Invoice</span>
              </a>
            </router-link>
          </li>

          <!-- SUPPLIER -->

          <li v-if="this.staff_category == 4">
            <router-link :to="{ name: 'admin-supplier' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Store - Supplier</span>
              </a>
            </router-link>
          </li>

          <li v-if=" this.staff_category != 4">
            <div>
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                " @click="triggerDropdown()">
                <span class="flex-1 ml-3 whitespace-nowrap">Report</span>
              </a>
            </div>
            <div v-if="this.show == true">
              <ul>
                <li>
                  <router-link :to="{ name: 'admin-report-t' }">
                    <a href="#" class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "><span class="flex-1 ml-3 whitespace-nowrap">Report Transaction</span>
                    </a>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'admin-report-s' }">
                    <a href="#" class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "><span class="flex-1 ml-3 whitespace-nowrap">Report Shift</span>
                    </a>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <router-link :to="{ name: 'login' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Settings</span>
              </a>
            </router-link>
          </li>

          <!-- LOGOUT -->
          <li>
            <router-link :to="{ name: 'login' }">
              <a href="#" class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                ">
                <span class="flex-1 ml-3 whitespace-nowrap">Log Out</span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      activeClick: false,
      outletDrop: false,
      menuDrop: false,
      stockDrop: false,
      stockDropOutlet: false,
      staff_category:null,
      staff_role: null,
    };
  },
  async created() { 
    this.getdata();
  },

  methods: {
    async clickActive() {
      if (this.activeClick == false) {
        this.activeClick = true;
      } else {
        this.activeClick = false;
      }
    },
    async dropdownMenu() {
      if (this.menuDrop == false) {
        this.menuDrop = true;
      } else {
        this.menuDrop = false;
      }
    },
    async dropdownOutlet() {
      if (this.outletDrop == false) {
        this.outletDrop = true;
      } else {
        this.outletDrop = false;
      }
    },
    async triggerDropdown() {
      if (this.show == false) {
        this.show = true;
      } else {
        this.show = false;
      }
    },

    async dropdownStock() {
      if (this.stockDrop == false) {
        this.stockDrop = true;
      } else {
        this.stockDrop = false;
      }
    },

    async dropdownStockOutlet() {
      if (this.stockDropOutlet == false) {
        this.stockDropOutlet = true;
      } else {
        this.stockDropOutlet = false;
      }
    },

    async getdata() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL_LOCAL + "/admin/dashboard" /*  */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.staffName = response.data.data[0].staff_name;
            this.staff_category = response.data.data[0].category;
            this.staff_role = response.data.data[0].role; 
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>